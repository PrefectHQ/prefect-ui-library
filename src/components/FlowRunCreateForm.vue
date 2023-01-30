<template>
  <p-form class="flow-run-create-form" @submit="submit">
    <p-content class="flow-run-create-form__section">
      <h3 class="flow-run-create-form__section-header">
        General
      </h3>

      <p-label label="Name (optional)">
        <p-text-input v-model="name">
          <template #append>
            <p-button
              class="flow-run-create-form__random-name-button"
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

      <p-label label="Tags (optional)">
        <p-tags-input v-model="tags" :options="deploymentTags" />
      </p-label>

      <p-label label="Add Retries">
        <p-toggle v-model="addRetries" />
      </p-label>

      <template v-if="addRetries">
        <p-label label="Retries (optional)">
          <p-number-input v-model="retries" :min="0" />
        </p-label>

        <p-label label="Retry Delay (optional)">
          <p-number-input v-model="retryDelay" :min="0" append="Seconds" />
        </p-label>
      </template>

      <p-divider v-if="deployment.parameters" />

      <h3 class="flow-run-create-form__section-header">
        Start
      </h3>

      <p-button-group v-model="when" :options="whenOptions" size="sm" />

      <template v-if="when == 'later'">
        <div class="flow-run-create-form__row">
          <p-label label="Date" :message="startErrorMessage" :state="startState">
            <DateInput v-model="start" show-time />
          </p-label>
          <p-label label="Timezone">
            <TimezoneSelect v-model="timezone" />
          </p-label>
        </div>
      </template>


      <template v-if="hasParameters">
        <p-divider />

        <h3 class="flow-run-create-form__section-header">
          Parameters
        </h3>

        <p-button-group v-model="overrideParameters" :options="overrideParametersOptions" size="sm" />

        <template v-if="overrideParameters == 'custom'">
          <SchemaFormFields property="parameters" :schema="deployment.parameterOpenApiSchema" />
        </template>
      </template>
    </p-content>

    <template #footer>
      <p-button inset @click="cancel">
        Cancel
      </p-button>
      <p-button type="submit">
        Run
      </p-button>
    </template>
  </p-form>
</template>

<script lang="ts" setup>
  import { PButton, ButtonGroupOption } from '@prefecthq/prefect-design'
  import { zonedTimeToUtc } from 'date-fns-tz'
  import { useField } from 'vee-validate'
  import { computed, ref, watch } from 'vue'
  import DateInput from '@/components/DateInput.vue'
  import SchemaFormFields from '@/components/SchemaFormFields.vue'
  import TimezoneSelect from '@/components/TimezoneSelect.vue'
  import { useForm } from '@/compositions/useForm'
  import { Deployment, DeploymentFlowRunCreate } from '@/models'
  import { mocker } from '@/services'
  import { fieldRules, isRequiredIf } from '@/utilities/validation'

  const props = defineProps<{
    deployment: Deployment,
  }>()

  const generateRandomName = (): string => {
    return mocker.create('runName')
  }

  const emit = defineEmits<{
    (event: 'submit', value: DeploymentFlowRunCreate): void,
    (event: 'cancel'): void,
  }>()

  const hasParameters = computed(() => {
    return Object.keys(props.deployment.parameterOpenApiSchema.properties ?? {}).length > 0
  })

  const rules = {
    start: fieldRules('Start date', isRequiredIf(() => when.value === 'later')),
  }

  const { handleSubmit } = useForm<DeploymentFlowRunCreate>({
    initialValues: {
      state: {
        type: 'scheduled',
      },
      tags: props.deployment.tags ?? [],
      name: generateRandomName(),
      parameters: props.deployment.parameters,
      schema: props.deployment.parameterOpenApiSchema,
    },
  })

  const { value: start, meta: startState, errorMessage: startErrorMessage } = useField<Date>('state.stateDetails.scheduledTime', rules.start)
  const { value: tags } = useField<string[]>('tags')
  const addRetries = ref(false)
  const { value: retries } = useField<number | null>('empiricalPolicy.retries')
  const { value: retryDelay } = useField<number | null>('empiricalPolicy.retryDelay')
  const { value: name } = useField<string>('name')
  const { value: stateMessage } = useField<string>('state.message')

  const adjustedStart = computed(() => zonedTimeToUtc(start.value, timezone.value))
  const whenOptions: ButtonGroupOption[] = [{ label: 'Now', value: 'now' }, { label: 'Later', value: 'later' }]
  const when = ref<'now' | 'later'>('now')

  const overrideParametersOptions: ButtonGroupOption[] = [{ label: 'Default', value: 'default' }, { label: 'Custom', value: 'custom' }]
  const overrideParameters = ref<'default' | 'custom'>('default')

  const timezone = ref('UTC')
  const deploymentTags = computed(() => props.deployment.tags?.map((tag) => ({ label: tag, value: tag, disabled: true })))

  const cancel = (): void => emit('cancel')
  const submit = handleSubmit((values): void => {
    const resolvedValues: DeploymentFlowRunCreate = { ...values }

    if (when.value == 'now' && resolvedValues.state?.stateDetails?.scheduledTime) {
      resolvedValues.state.stateDetails.scheduledTime = null
    }

    if (when.value == 'later' && resolvedValues.state?.stateDetails?.scheduledTime) {
      resolvedValues.state.stateDetails.scheduledTime = adjustedStart.value
    }

    if (overrideParameters.value == 'default') {
      delete resolvedValues.parameters
    }

    emit('submit', resolvedValues)
  })

  watch(addRetries, value => {
    if (!value) {
      retries.value = null
      retryDelay.value = null
    }
  })
</script>

<style>
.flow-run-create-form { @apply
  border
  dark:border-background-600
  px-6
  py-6
  rounded-lg
}

.flow-run-create-form__random-name-button { @apply
  rounded-none
  rounded-tr
  rounded-br
}

.flow-run-create-form__title { @apply
  font-semibold
  m-0
  p-0
}

.flow-run-create-form__section-header { @apply
  text-lg
  font-semibold
}

.flow-run-create-form__row { @apply
  grid
  gap-2
  grid-cols-2
}

.flow-run-create-form__tag { @apply
  py-0
}
</style>