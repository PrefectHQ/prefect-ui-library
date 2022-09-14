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
        <p-tags-input v-model="tags" :options="deploymentTags">
          <template #default="{ selectedOption }">
            <p-tag :dismissible="!selectedOption.disabled">
              {{ selectedOption.label }}
            </p-tag>
          </template>
        </p-tags-input>
      </p-label>

      <p-divider v-if="deployment.parameters" />

      <h3 class="flow-run-create-form__section-header">
        Start
      </h3>

      <p-button-group v-model="when" :options="whenOptions" size="sm" />

      <template v-if="when == 'later'">
        <div class="flow-run-create-form__row">
          <p-label label="Date" :message="startErrorMessage" :state="startState">
            <p-date-input v-model="start" show-time />
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
  import  { PButton, ButtonGroupOption } from '@prefecthq/prefect-design'
  import { zonedTimeToUtc } from 'date-fns-tz'
  import { useField, useForm } from 'vee-validate'
  import { computed, ref } from 'vue'
  import SchemaFormFields from './SchemaFormFields.vue'
  import TimezoneSelect from './TimezoneSelect.vue'
  import { Deployment, DeploymentFlowRunCreate } from '@/models'
  import { isRequired, mocker, withMessage } from '@/services'

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

  const requiredIfLater = (value: unknown): boolean => {
    if (when.value == 'now') {
      return true
    }

    return isRequired(value)
  }

  const rules = {
    start: withMessage(requiredIfLater, 'Start date is required'),
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
</script>

<style>
.flow-run-create-form { @apply
  border-[1px]
  border-gray-300
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
</style>