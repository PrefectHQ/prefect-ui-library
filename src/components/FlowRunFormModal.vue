<template>
  <slot :open="open" :close="close" />
  <p-modal v-model:showModal="showModal" class="flow-run-form-modal">
    <template #title>
      <div>
        New run of <span class="flow-run-form-modal__title">{{ deployment.name }}</span>
      </div>
    </template>

    <p-content>
      <h3 class="flow-run-form-modal__section-header">
        General
      </h3>

      <p-label label="Name">
        <p-text-input v-model="name">
          <template #append>
            <p-button
              class="flow-run-form-modal__random-name-button"
              color="primary"
              icon="RefreshIcon"
              @click="name = generateRandomName()"
            />
          </template>
        </p-text-input>
      </p-label>

      <p-label label="Message (optional)">
        <p-textarea v-model="stateMessage" placeholder="Created from the Prefect UI" />
      </p-label>

      <p-label label="Tags">
        <p-tags-input v-model="tags" />
      </p-label>
    </p-content>

    <p-divider v-if="deployment.parameters" />

    <p-content>
      <h3 class="flow-run-form-modal__section-header">
        Start
      </h3>

      <p-button-group v-model="nowOrLater" :options="nowOrLaterOptions" size="sm" />

      <template v-if="nowOrLater == 'later'">
        <div class="flow-run-form-modal__row">
          <p-label label="Date" class="interval-schedule-form__column--span-2">
            <p-date-input v-model="start" show-time />
          </p-label>

          <p-label label="Timezone" class="interval-schedule-form__column--span-2">
            <TimezoneSelect v-model="timezone" />
          </p-label>
        </div>
      </template>
    </p-content>

    <p-divider v-if="deployment.parameters" />

    <p-content v-if="deployment.parameters">
      <h3 class="flow-run-form-modal__section-header" :class="classes.parameters">
        <p-icon
          v-if="errors.parameters"
          class="flow-run-form-modal__section-header__icon"
          icon="ExclamationCircleIcon"
        />
        Parameters
      </h3>

      <div v-if="errors.parameters" class="flow-run-form-modal__section-messages">
        {{ errors.parameters }}
      </div>

      <p-button-group v-model="useParameters" :options="useParametersOptions" size="sm" />

      <template v-if="useParameters == 'custom'">
        <PydanticForm v-model="formParameters" hide-footer :validate-on-mount="submitCount > 0" :pydantic-schema="deployment.parameterOpenApiSchema" />
      </template>
    </p-content>

    <template #actions>
      <p-button type="submit" :disabled="disabled" @click="submit">
        Run {{ useParameters == 'custom' ? '(custom)' : '' }}
      </p-button>
    </template>
  </p-modal>
</template>

<script lang="ts" setup>
  import  { PButton, showToast, ButtonGroupOption } from '@prefecthq/prefect-design'
  import { zonedTimeToUtc } from 'date-fns-tz'
  import { useForm, useField } from 'vee-validate'
  import { ref, h, computed, watch } from 'vue'
  import CreateFlowRunToast from './CreateFlowRunToast.vue'
  import PydanticForm from './PydanticForm.vue'
  import TimezoneSelect from './TimezoneSelect.vue'
  import { useShowModal } from '@/compositions'
  import { localization } from '@/localization'
  import { CreateFlowRun, Deployment } from '@/models'

  import { mocker, withMessage } from '@/services'
  import { deploymentsApiKey } from '@/services/DeploymentsApi'
  import { canKey } from '@/types'
  import { inject } from '@/utilities'

  const generateRandomName = (): string => {
    return mocker.create('runName')
  }

  const props = defineProps<{
    deployment: Deployment,
  }>()

  const can = inject(canKey)
  const deploymentsApi = inject(deploymentsApiKey)

  const flowRun = ref()
  const loading = ref(false)

  const computedParameters = computed(() => {
    return useParameters.value == 'custom' ? formParameters.value : props.deployment.parameters
  })

  const utcStartTime = computed(() => {
    return zonedTimeToUtc(start.value, timezone.value)
  })

  const hasAllRequiredParameters = (formValue: unknown): boolean => {
    const requiredProperties = props.deployment.parameterOpenApiSchema.required

    if (!requiredProperties?.length) {
      return true
    }

    if (typeof formValue !== 'object' || formValue == null) {
      return false
    }

    let valid = true

    requiredParametersLoop: for (let i = 0, len = requiredProperties.length; i < len; ++i) {
      if (requiredProperties[i] in formValue) {
        continue
      } else {
        valid = false
        break requiredParametersLoop
      }
    }

    return valid
  }

  const disabled = computed(() => {
    return !can.create.flow_run
  })

  const classes = computed(() => {
    return {
      parameters:  {
        'flow-run-form-modal--invalid': !!errors.value.parameters,
      },
    }
  })

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  const initialParameterValues = { ...props.deployment.parameters ?? {} }
  const initialParameterTypes: Record<keyof typeof initialParameterValues, string> = { }

  Object.keys(initialParameterValues).forEach((key: keyof typeof initialParameterTypes) => {
    const parameter = initialParameterValues[key]
    if (typeof parameter == 'string' && Date.parse(parameter)) {
      initialParameterValues[key] = new Date(parameter)
    }

    initialParameterTypes[key] = typeof parameter
  })

  const { showModal, open, close } = useShowModal()

  const getInitialFormValues = (): Record<string, unknown> => {
    return {
      state: {
        message: '',
        scheduledStart: new Date(),
      },
      tags: props.deployment.tags ?? [],
      name: generateRandomName(),
      parameters: { ...initialParameterValues },
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      nowOrLater: 'now',
      useParameters: 'default',
    }
  }

  const { resetForm, validate, errors, submitCount } = useForm({
    validationSchema: {
      parameters: withMessage(() => hasAllRequiredParameters(computedParameters.value), 'This flow has required parameters that aren\'t supplied by the deployment. Choose \'Custom\' to supply them now.'),
    },
    initialValues: getInitialFormValues(),
  })

  const { value: start } = useField<Date>('state.scheduledStart')
  const { value: tags } = useField<string[]>('tags')
  const { value: name } = useField<string>('name')
  const { value: stateMessage } = useField<string>('state.message')
  const { value: formParameters } = useField<Record<string, unknown>>('parameters', undefined, { keepValueOnUnmount: true })
  const { value: timezone } = useField<string>('timezone')

  const nowOrLaterOptions: ButtonGroupOption[] = [{ label: 'Now', value: 'now' }, { label: 'Later', value: 'later' }]
  const { value: nowOrLater } = useField<typeof nowOrLaterOptions[number]['value']>('nowOrLater')

  const useParametersOptions: ButtonGroupOption[] = [{ label: 'Default', value: 'default' }, { label: 'Custom', value: 'custom' }]
  const { value: useParameters } = useField<typeof useParametersOptions[number]['value']>('useParameters')

  const createFlowRunBody = computed<CreateFlowRun>(() => {
    return {
      name: name.value,
      parameters: computedParameters.value,
      tags: tags.value,
      state: {
        type: 'scheduled',
        message: stateMessage.value,
        scheduledTime: utcStartTime.value,
      },
    }
  })

  const submit = async (): Promise<void> => {
    loading.value = true

    const { valid } = await validate()

    // Do nothing with validity right now
    if (!valid) {
      return
    }

    try {
      flowRun.value = await deploymentsApi.createDeploymentFlowRun(props.deployment.id, createFlowRunBody.value)
      const toastMessage = h(CreateFlowRunToast, { flowRun: flowRun.value, immediate: nowOrLater.value == 'now', startTime: utcStartTime.value })
      close()
      showToast(toastMessage, 'success')
    } catch (error) {
      showToast(localization.error.scheduleFlowRun, 'error')
      console.warn(error)
    } finally {
      loading.value = false
    }
  }

  watch(showModal, (val, oldVal) => {
    if (val && !oldVal) {
      resetForm({ values: getInitialFormValues(), errors: {}, touched: {} })
    }
  })
</script>

<style>
.flow-run-form-modal {
  min-width: 850px;
}

.flow-run-form-modal__random-name-button { @apply
  rounded-none
  rounded-tr
  rounded-br
}

.flow-run-form-modal__title { @apply
  font-semibold
  m-0
  p-0
}

.flow-run-form-modal__section-header { @apply
  text-lg
  font-semibold
}

.flow-run-form-modal__row { @apply
  grid
  gap-2
  grid-cols-4;
}

.flow-run-form-modal--invalid { @apply
  text-red-500
}

.flow-run-form-modal__section-messages { @apply
  text-sm
}

.flow-run-form-modal__section-header__icon { @apply
  inline-block
}
</style>

