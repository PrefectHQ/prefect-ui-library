<template>
  <slot :open="open" :close="close" />
  <p-modal v-model:showModal="showModal" class="run-form">
    <template #title>
      <div>
        New run of <span class="run-form__title">{{ deployment.name }}</span>
      </div>
    </template>

    <p-content>
      <h3 class="run-form__section-header">
        General
      </h3>

      <p-label label="Name">
        <p-text-input v-model="name">
          <template #append>
            <p-button
              class="run-form__random-name-button"
              color="primary"
              icon="RefreshIcon"
              @click.self="name = generateRandomName()"
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
      <h3 class="run-form__section-header">
        Start
      </h3>

      <p-button-group v-model="nowOrLater" :options="nowOrLaterOptions" size="sm" />

      <template v-if="nowOrLater == 'later'">
        <div class="run-form__row">
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
      <h3 class="run-form__section-header">
        Parameters
      </h3>

      <p-button-group v-model="useParameters" :options="useParametersOptions" size="sm" />

      <template v-if="useParameters == 'custom'">
        <PydanticForm v-model="parameters" hide-footer :pydantic-schema="deployment.parameterOpenApiSchema" />
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
  import { useField } from 'vee-validate'
  import { ref, h, computed } from 'vue'
  import { RouteLocationRaw, useRouter } from 'vue-router'
  import CreateFlowRunToast from './CreateFlowRunToast.vue'
  import PydanticForm from './PydanticForm.vue'
  import TimezoneSelect from './TimezoneSelect.vue'
  import { useShowModal } from '@/compositions'
  import { localization } from '@/localization'
  import { CreateFlowRun, Deployment } from '@/models'
  import { flowRunRouteKey } from '@/router/routes'
  import { mocker } from '@/services'
  import { deploymentsApiKey } from '@/services/DeploymentsApi'
  import { canKey } from '@/types'
  import { inject } from '@/utilities'


  const props = defineProps<{
    deployment: Deployment,
  }>()

  const generateRandomName = (): string => {
    return mocker.create('runName')
  }

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  const initialValues = { ...props.deployment.parameters ?? {} }
  const initialTypes: Record<keyof typeof initialValues, string> = { }

  Object.keys(initialValues).forEach((key: keyof typeof initialValues) => {
    const parameter = initialValues[key]
    if (typeof parameter == 'string' && Date.parse(parameter)) {
      initialValues[key] = new Date(parameter)
    }

    initialTypes[key] = typeof parameter
  })

  const { showModal, open, close: closeModal } = useShowModal()
  const can = inject(canKey)
  const deploymentsApi = inject(deploymentsApiKey)
  const loading = ref(false)
  const start = ref(new Date())
  const tags = ref(props.deployment.tags ?? [])
  const name = ref(generateRandomName())
  const stateMessage = ref('')
  const { value: parameters, resetField: resetParameters } = useField<Record<string, unknown>>('parameters', undefined, { initialValue: initialValues })
  const timezone = ref(Intl.DateTimeFormat().resolvedOptions().timeZone)

  const nowOrLater = ref('now')
  const nowOrLaterOptions: ButtonGroupOption[] = [{ label: 'Now', value: 'now' }, { label: 'Later', value: 'later' }]

  const useParameters = ref('default')
  const useParametersOptions: ButtonGroupOption[] = [{ label: 'Default', value: 'default' }, { label: 'Custom', value: 'custom' }]
  const computedParameters = computed(() => {
    return useParameters.value == 'custom' ? parameters.value : props.deployment.parameters
  })

  const flowRun = ref()

  const disabled = computed(() => {
    return !can.create.flow_run
  })

  const router = useRouter()
  const flowRunRoute = inject(flowRunRouteKey)

  const utcStartTime = computed(() => {
    return zonedTimeToUtc(start.value, timezone.value)
  })

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

  const close = (): void => {
    nowOrLater.value = 'now'
    useParameters.value = 'default'
    resetParameters()
    closeModal()
  }

  const submit = async (deployment: Deployment): Promise<void> => {
    loading.value = true

    try {
      flowRun.value = await deploymentsApi.createDeploymentFlowRun(deployment.id, createFlowRunBody.value)
      const runRoute: RouteLocationRaw = flowRunRoute(flowRun.value.id)
      const toastMessage = h(CreateFlowRunToast, { flowRun: flowRun.value, flowRunRoute: runRoute, immediate: nowOrLater.value == 'now', startTime: utcStartTime.value, routerProp:router })
      close()
      showToast(toastMessage, 'success')
    } catch (error) {
      showToast(localization.error.scheduleFlowRun, 'error')
      console.warn(error)
    } finally {
      loading.value = false
    }
  }
</script>

<style>
.run-form {
  min-width: 850px;
}

.run-form__random-name-button { @apply
  rounded-none
  rounded-tr
  rounded-br
}

.run-form__title { @apply
  font-semibold
  m-0
  p-0
}

.run-form__section-header { @apply
  text-lg
  font-semibold
}

.run-form__row { @apply
  grid
  gap-2
  grid-cols-4;
}
</style>

