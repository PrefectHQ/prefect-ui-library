<template>
  <p-form>
    <p-content class="flow-run-form__section">
      <h3 class="flow-run-form__section-header">
        General
      </h3>

      <p-label label="Name">
        <p-text-input v-model="name">
          <template #append>
            <p-button
              class="flow-run-form__random-name-button"
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

      <p-divider v-if="deployment.parameters" />

      <h3 class="flow-run-form__section-header">
        Start
      </h3>

      <p-button-group v-model="nowOrLater" :options="nowOrLaterOptions" size="sm" />

      <template v-if="nowOrLater == 'later'">
        <div class="flow-run-form__row">
          <p-label label="Date" class="interval-schedule-form__column--span-2">
            <p-date-input v-model="start" show-time />
          </p-label>

          <p-label label="Timezone" class="interval-schedule-form__column--span-2">
            <TimezoneSelect v-model="timezone" />
          </p-label>
        </div>
      </template>

      <p-divider v-if="deployment.parameters" />

      <h3 class="flow-run-form__section-header">
        Parameters
      </h3>

      <p-button-group v-model="overrideParameters" :options="useParametersOptions" size="sm" />

      <template v-if="overrideParameters == 'custom'">
        <PydanticForm v-model="parameters" hide-footer :pydantic-schema="deployment.parameterOpenApiSchema" />
      </template>
    </p-content>
  </p-form>
</template>

<script lang="ts" setup>
  import  { PButton, ButtonGroupOption } from '@prefecthq/prefect-design'
  import { zonedTimeToUtc } from 'date-fns-tz'
  import { useField, useForm } from 'vee-validate'
  import { ref, computed } from 'vue'
  import PydanticForm from './PydanticForm.vue'
  import TimezoneSelect from './TimezoneSelect.vue'
  import { useParameters } from '@/compositions'
  import { CreateFlowRun, Deployment, IFlowRunRequest, FlowRunFormValues } from '@/models'
  import { mocker } from '@/services'

  const generateRandomName = (): string => {
    return mocker.create('runName')
  }

  const props = defineProps<{
    modelValue?: Partial<CreateFlowRun>,
    deployment: Deployment,
  }>()

  const emit = defineEmits<{
    (event: 'submit', value: IFlowRunRequest): void,
    (event: 'cancel'): void,
  }>()

  const deploymentParameters = ref(props.deployment.parameters)
  const { parameters: parameterValues } = useParameters(deploymentParameters)

  const getInitialFormValues = (): Record<string, unknown> => {
    return {
      state: {
        message: '',
        scheduledStart: new Date(),
      },
      tags: props.deployment.tags ?? [],
      name: generateRandomName(),
      parameters: parameterValues,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      nowOrLater: 'now',
      overrideParameters: 'default',
    }
  }

  const { value: start } = useField<Date>('state.scheduledStart')
  const { value: tags } = useField<string[]>('tags')
  const { value: name } = useField<string>('name')
  const { value: stateMessage } = useField<string>('state.message')
  const { value: parameters } = useField<Record<string, unknown>>('parameters')
  const { value: timezone } = useField<string>('timezone')

  const nowOrLaterOptions: ButtonGroupOption[] = [{ label: 'Now', value: 'now' }, { label: 'Later', value: 'later' }]
  const { value: nowOrLater } = useField<typeof nowOrLaterOptions[number]['value']>('nowOrLater')

  const useParametersOptions: ButtonGroupOption[] = [{ label: 'Default', value: 'default' }, { label: 'Custom', value: 'custom' }]
  const { value: overrideParameters } = useField<typeof useParametersOptions[number]['value']>('overrideParameters')

  const computedParameters = computed(() => {
    return overrideParameters.value == 'custom' ? parameters.value : props.deployment.parameters
  })

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

  const internalValue = computed(() => {
    return new FlowRunFormValues({
      name: name.value,
      parameters: computedParameters.value,
      tags: tags.value,
      state: {
        type: 'scheduled',
        message: stateMessage.value,
        stateDetails: {
          scheduledTime: utcStartTime.value,
        },
      },
    })
  })

  const { handleSubmit } = useForm({
    initialValues: getInitialFormValues(),
  })

  const submit = handleSubmit(() => {
    emit('submit', internalValue.value.getCreateFlowRunRequest())
  })

  const cancel = (): void => {
    emit('cancel')
  }
</script>

<style>
.flow-run-form__random-name-button { @apply
  rounded-none
  rounded-tr
  rounded-br
}

.flow-run-form__title { @apply
  font-semibold
  m-0
  p-0
}

.flow-run-form__section-header { @apply
  text-lg
  font-semibold
}

.flow-run-form__row { @apply
  grid
  gap-2
  grid-cols-4;
}
</style>

