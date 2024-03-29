<template>
  <p-form class="flow-run-create-form p-background" @submit="submit">
    <p-content class="flow-run-create-form__section">
      <p-label label="Run Name">
        <p-text-input v-model="name">
          <template #append>
            <p-button
              color="primary"
              icon="ArrowPathIcon"
              flat
              @click="name = generateRandomName()"
            />
          </template>
        </p-text-input>
      </p-label>

      <template v-if="hasParameters">
        <p-divider />

        <p-content>
          <h3>
            {{ localization.info.parameters }}
          </h3>

          <SchemaInput v-model="parameters" v-model:input-type="parametersInputType" :schema="deployment.parameterOpenApiSchema">
            <template #button-group>
              <p-button-group v-model="parametersInputType" :options="parametersInputTypeOptions" small />
            </template>
          </SchemaInput>
        </p-content>
      </template>

      <h3>Start</h3>

      <p-button-group v-model="when" :options="whenOptions" small />

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

      <p-accordion :sections="['Additional Options']">
        <template #heading="{ section }">
          <span class="flow-run-create-form__options-heading">
            {{ section }}
          </span>
        </template>
        <template #content>
          <p-content class="flow-run-create-form__options">
            <p-label label="Message (Optional)">
              <p-textarea v-model="stateMessage" placeholder="Created from the Prefect UI" />
            </p-label>
            <p-label label="Tags (Optional)">
              <p-tags-input v-model="tags" :options="deploymentTags" />
            </p-label>

            <p-label v-if="workPoolName && !workPool?.isPushPool" :label="workQueueComboboxLabel">
              <WorkPoolQueueCombobox v-model:selected="workQueueName" :work-pool-name="workPoolName" />
            </p-label>

            <div class="flow-run-create-form__retries">
              <p-label label="Retries (optional)">
                <p-number-input v-model="retries" :min="0" />
              </p-label>

              <p-label label="Retry Delay (optional)">
                <p-number-input v-model="retryDelay" :min="0" append="Seconds" />
              </p-label>
            </div>

            <FlowRunJobVariableOverridesLabeledInput v-model="jobVariables" />
          </p-content>
        </template>
      </p-accordion>
    </p-content>

    <template #footer>
      <p-button @click="cancel">
        Cancel
      </p-button>
      <p-button primary type="submit">
        Submit
      </p-button>
    </template>
  </p-form>
</template>

<script lang="ts" setup>
  import { PButton, ButtonGroupOption } from '@prefecthq/prefect-design'
  import { useValidation, useValidationObserver } from '@prefecthq/vue-compositions'
  import { zonedTimeToUtc } from 'date-fns-tz'
  import { merge } from 'lodash'
  import { computed, ref } from 'vue'
  import { TimezoneSelect, DateInput, WorkPoolQueueCombobox } from '@/components'
  import FlowRunJobVariableOverridesLabeledInput from '@/components/FlowRunJobVariableOverridesLabeledInput.vue'
  import SchemaInput from '@/components/SchemaInput.vue'
  import { useCan } from '@/compositions'
  import { useWorkPool } from '@/compositions/useWorkPool'
  import { localization } from '@/localization'
  import { Deployment, DeploymentFlowRunCreate } from '@/models'
  import { mapper, mocker } from '@/services'
  import { SchemaInputType } from '@/types/schemaInput'
  import { SchemaValues } from '@/types/schemas'
  import { isEmptyObject } from '@/utilities/object'
  import { fieldRules, isRequiredIf } from '@/utilities/validation'

  const props = defineProps<{
    deployment: Deployment,
    // these must be the unmapped SchemaValues
    parameters?: SchemaValues,
    name?: string,
  }>()

  const generateRandomName = (): string => {
    return mocker.create('runName')
  }

  const emit = defineEmits<{
    (event: 'submit', value: DeploymentFlowRunCreate): void,
    (event: 'cancel'): void,
  }>()

  const can = useCan()

  const hasParameters = computed(() => !isEmptyObject(props.deployment.parameterOpenApiSchema.properties ?? {}))

  const rules = {
    start: fieldRules('Start date', isRequiredIf(() => when.value === 'later')),
  }

  const combinedParameters = computed(() => {
    const values = merge({}, props.deployment.rawParameters, props.parameters)

    return mapper.map('SchemaValuesResponse', { values, schema: props.deployment.parameterOpenApiSchema }, 'SchemaValues')
  })

  const whenOptions: ButtonGroupOption[] = [{ label: 'Now', value: 'now' }, { label: 'Later', value: 'later' }]
  const when = ref<'now' | 'later'>('now')

  const parametersInputTypeOptions: ButtonGroupOption[] = [{ label: 'Default', value: null }, { value: 'form', label: 'Custom' }, { value: 'json', label: 'JSON' }]
  const parametersInputType = ref<SchemaInputType>(props.parameters ? 'form' : null)

  const timezone = ref('UTC')
  const deploymentTags = computed(() => props.deployment.tags?.map((tag) => ({ label: tag, value: tag, disabled: true })))

  const cancel = (): void => emit('cancel')

  const { validate } = useValidationObserver()

  const start = ref<Date | null>(null)
  const { state: startState, error: startErrorMessage } = useValidation(start, rules.start)

  const tags = ref<string[]>(props.deployment.tags ?? [])
  const retries = ref<number | null>(null)
  const retryDelay = ref<number | null>(null)
  const name = ref<string>(props.name ?? generateRandomName())
  const parameters = ref<SchemaValues>(combinedParameters.value)
  const stateMessage = ref<string>('')
  const workQueueName = ref<string | null>(props.deployment.workQueueName)
  const workPoolName = ref<string | null>(props.deployment.workPoolName)

  const { workPool } = useWorkPool(props.deployment.workPoolName ?? '')
  const workQueueComboboxLabel = computed(() => `Work Queue for ${workPoolName.value} (Optional)`)

  const jobVariables = ref<string | undefined>(can.access.flowRunInfraOverrides ? '{}' : undefined)

  function getScheduledTime(): Date | null {
    if (when.value === 'now' || start.value === null) {
      return null
    }

    return zonedTimeToUtc(start.value, timezone.value)
  }

  function getParameters(): SchemaValues | undefined {
    if (parametersInputType.value === null) {
      return undefined
    }

    return parameters.value
  }

  async function submit(): Promise<void> {
    const valid = await validate()

    if (!valid) {
      return
    }

    const values: DeploymentFlowRunCreate = {
      state: {
        type: 'scheduled',
        message: stateMessage.value,
        stateDetails: {
          scheduledTime: getScheduledTime(),
        },
      },
      tags: tags.value,
      workQueueName: workQueueName.value,
      empiricalPolicy: {
        retries: retries.value,
        retryDelay: retryDelay.value,
        maxRetries: null,
        retryDelaySeconds: null,
      },
      name: name.value,
      jobVariables: jobVariables.value ? JSON.parse(jobVariables.value) : undefined,
    }

    const parameters = getParameters()

    if (!parameters) {
      emit('submit', values)
      return
    }

    const valuesWithParameters: DeploymentFlowRunCreate = {
      ...values,
      parameters,
      schema: props.deployment.parameterOpenApiSchema,
    }

    emit('submit', valuesWithParameters)
  }
</script>

<style>
.flow-run-create-form { @apply
  px-6
  py-6
  rounded-default
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

.flow-run-create-form__options-heading { @apply
  text-lg
  font-semibold
}

.flow-run-create-form__options { @apply
  pt-5
}
</style>