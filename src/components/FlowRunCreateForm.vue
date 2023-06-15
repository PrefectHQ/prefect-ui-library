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
              icon="ArrowPathIcon"
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

      <div class="flow-run-create-form__retries">
        <p-label label="Retries (optional)">
          <p-number-input v-model="retries" :min="0" />
        </p-label>

        <p-label label="Retry Delay (optional)">
          <p-number-input v-model="retryDelay" :min="0" append="Seconds" />
        </p-label>
      </div>

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

        <p-content>
          <h3>
            {{ localization.info.parameters }}
          </h3>

          <SchemaInput v-model="combinedParameters" :input-type="parametersInputType" :schema="deployment.parameterOpenApiSchema">
            <template #button-group="{ inputType, setInputType }">
              <!--
                The split model-value and update:model-value does the same thing as v-model; unfortunately slots
                don't support v-model at the moment: https://github.com/vuejs/core/issues/5899
              -->
              <p-button-group :model-value="inputType" :options="parametersInputTypeOptions" size="sm" @update:model-value="setInputType" />
            </template>
          </SchemaInput>
        </p-content>
      </template>
    </p-content>

    <template #footer>
      <p-button inset @click="cancel">
        Cancel
      </p-button>
      <p-button type="submit" :disabled="!valid">
        Run
      </p-button>
    </template>
  </p-form>
</template>

<script lang="ts" setup>
  import { PButton, ButtonGroupOption } from '@prefecthq/prefect-design'
  import { useValidationObserver } from '@prefecthq/vue-compositions'
  import { zonedTimeToUtc } from 'date-fns-tz'
  import { useField } from 'vee-validate'
  import { computed, ref } from 'vue'
  import { isJson, localization } from '..'
  import { TimezoneSelect, DateInput } from '@/components'
  import SchemaInput from '@/components/SchemaInput.vue'
  import { useForm } from '@/compositions/useForm'
  import { Deployment, DeploymentFlowRunCreate } from '@/models'
  import { mocker } from '@/services'
  import { SchemaInputType } from '@/types/schemaInput'
  import { SchemaValues } from '@/types/schemas'
  import { fieldRules, isRequiredIf } from '@/utilities/validation'

  const props = defineProps<{
    deployment: Deployment,
    // these must be the unmapped SchemaValues
    parameters?: SchemaValues,
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
    jsonParameters: fieldRules('Parameters', isJson),
  }

  const combinedParameters = computed(() => {
    return { ...props.deployment.parameters, ...props.parameters }
  })

  const { handleSubmit } = useForm<DeploymentFlowRunCreate>({
    initialValues: {
      state: {
        type: 'scheduled',
      },
      tags: props.deployment.tags ?? [],
      name: generateRandomName(),
      parameters: combinedParameters.value,
      schema: props.deployment.parameterOpenApiSchema,
    },
  })

  const { value: start, meta: startState, errorMessage: startErrorMessage } = useField<Date>('state.stateDetails.scheduledTime', rules.start)
  const { value: tags } = useField<string[]>('tags')
  const { value: retries } = useField<number | null>('empiricalPolicy.retries')
  const { value: retryDelay } = useField<number | null>('empiricalPolicy.retryDelay')
  const { value: name } = useField<string>('name')
  const { value: parameters } = useField<SchemaValues>('parameters')
  const { value: stateMessage } = useField<string>('state.message')

  const adjustedStart = computed(() => zonedTimeToUtc(start.value, timezone.value))
  const whenOptions: ButtonGroupOption[] = [{ label: 'Now', value: 'now' }, { label: 'Later', value: 'later' }]
  const when = ref<'now' | 'later'>('now')

  const parametersInputTypeOptions: ButtonGroupOption[] = [{ label: 'Default', value: null }, { value: 'form', label: 'Custom' }, { value: 'json', label: 'JSON' }]
  const parametersInputType = ref<SchemaInputType>(props.parameters ? 'form' : null)

  const timezone = ref('UTC')
  const deploymentTags = computed(() => props.deployment.tags?.map((tag) => ({ label: tag, value: tag, disabled: true })))

  const cancel = (): void => emit('cancel')

  const { validate, valid } = useValidationObserver()

  const submit = handleSubmit(async (values): Promise<void> => {
    const valid = await validate()

    if (!valid) {
      return
    }


    const resolvedValues: DeploymentFlowRunCreate = { ...values }

    if (when.value == 'now' && resolvedValues.state?.stateDetails?.scheduledTime) {
      resolvedValues.state.stateDetails.scheduledTime = null
    }

    if (when.value == 'later' && resolvedValues.state?.stateDetails?.scheduledTime) {
      resolvedValues.state.stateDetails.scheduledTime = adjustedStart.value
    }

    if (parametersInputType.value === null) {
      delete resolvedValues.parameters
    } else if (parametersInputType.value == 'json') {
      resolvedValues.parameters = parameters.value
    }

    emit('submit', resolvedValues)
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

.flow-run-create-form__retries { @apply
  flex
  gap-4
}
</style>