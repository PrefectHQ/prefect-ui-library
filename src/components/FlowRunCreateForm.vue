<template>
  <p-form class="flow-run-create-form-v2 p-background" novalidate @submit="submit">
    <p-content>
      <p-label label="Run Name" :state="nameState" :message="nameError">
        <FlowRunNameInput v-model="name" :state="nameState" />
      </p-label>

      <template v-if="hasParameters">
        <p-divider />

        <p-content>
          <SchemaInputV2 v-model:values="parameters" :schema="schema" :errors="errors" :kinds="['json', 'workspace_variable']">
            <template #default="{ kind, setKind }">
              <div class="flow-run-create-form-v2__header">
                <h3>{{ localization.info.parameters }}</h3>
                <p-icon-button-menu small>
                  <p-overflow-menu-item v-if="kind === 'json'" label="Use form input" @click="setKind('none')" />
                  <p-overflow-menu-item v-if="kind === 'none'" label="Use JSON input" @click="setKind('json')" />
                </p-icon-button-menu>
              </div>
            </template>
          </SchemaInputV2>

          <p-checkbox v-model="enforceParameterSchema" label="Validate parameters" />
        </p-content>
      </template>

      <p-divider />
      <h3>Start</h3>
      <FlowRunCreateFormWhen v-model:start="scheduledTime" />

      <p-accordion :sections="['Additional Options']">
        <template #heading="{ section }">
          <h3>{{ section }}</h3>
        </template>

        <template #content>
          <p-content class="pt-4">
            <p-label label="Message (Optional)">
              <p-textarea v-model="stateMessage" placeholder="Created from the Prefect UI" />
            </p-label>

            <p-label label="Tags (Optional)">
              <FlowRunCreateFormTags v-model:tags="tags" :deployment="deployment" />
            </p-label>

            <template v-if="deployment.workPoolName">
              <FlowRunCreateFormWorkQueueCombobox v-model:work-queue-name="workQueueName" :work-pool-name="deployment.workPoolName" />
            </template>

            <div class="flow-run-create-form-v2__retries">
              <p-label label="Retries (Optional)">
                <p-number-input v-model="retries" :min="0" />
              </p-label>

              <p-label label="Retry Delay (Optional)">
                <p-number-input v-model="retryDelay" :min="0" append="Seconds" />
              </p-label>
            </div>

            <FlowRunJobVariableOverridesLabeledInput v-model="jobVariables" />
          </p-content>
        </template>
      </p-accordion>
    </p-content>

    <template #footer>
      <p-button @click="emit('cancel')">
        Cancel
      </p-button>
      <p-button variant="default" type="submit" :disabled>
        Submit
      </p-button>
    </template>
  </p-form>
</template>

<script lang="ts" setup>
  import { showToast } from '@prefecthq/prefect-design'
  import { useValidation, useValidationObserver } from '@prefecthq/vue-compositions'
  import { computed, h, ref } from 'vue'
  import FlowRunCreateFormTags from '@/components/FlowRunCreateFormTags.vue'
  import FlowRunCreateFormWhen from '@/components/FlowRunCreateFormWhen.vue'
  import FlowRunCreateFormWorkQueueCombobox from '@/components/FlowRunCreateFormWorkQueueCombobox.vue'
  import FlowRunJobVariableOverridesLabeledInput from '@/components/FlowRunJobVariableOverridesLabeledInput.vue'
  import FlowRunNameInput from '@/components/FlowRunNameInput.vue'
  import ToastParameterValidationError from '@/components/ToastParameterValidationError.vue'
  import { localization } from '@/localization'
  import { Deployment } from '@/models/Deployment'
  import { DeploymentFlowRunCreate } from '@/models/DeploymentFlowRunCreate'
  import { SchemaInputV2, SchemaValuesV2 } from '@/schemas'
  import { useSchemaValidation } from '@/schemas/compositions/useSchemaValidation'
  import { SchemaValues } from '@/schemas/types/schemaValues'
  import { isEmptyObject } from '@/utilities/object'
  import { isRequired } from '@/utilities/validation'

  const props = defineProps<{
    deployment: Deployment,
    parameters?: SchemaValues,
    disabled?: boolean,
    name?: string,
  }>()

  const emit = defineEmits<{
    (event: 'submit', value: DeploymentFlowRunCreate): void,
    (event: 'cancel'): void,
  }>()

  const enforceParameterSchema = ref(props.deployment.enforceParameterSchema)
  const schema = computed(() => props.deployment.parameterOpenApiSchema)
  const hasParameters = computed(() => !isEmptyObject(props.deployment.parameterOpenApiSchema.properties ?? {}))

  const { validate } = useValidationObserver()

  const name = ref(props.name)
  const { state: nameState, error: nameError } = useValidation(name, isRequired('name'))

  const parameters = ref<SchemaValuesV2>({ ...props.deployment.parameters, ...props.parameters ?? {} })
  const scheduledTime = ref<Date | null>(null)
  const stateMessage = ref<string>('')
  const tags = ref<string[]>(props.deployment.tags ?? [])
  const workQueueName = ref<string | null>(props.deployment.workQueueName)
  const retries = ref<number | null>(null)
  const retryDelay = ref<number | null>(null)
  const jobVariables = ref<string | undefined>('{}')

  const { errors, validate: validateParameters } = useSchemaValidation(schema, parameters)

  async function submit(): Promise<void> {
    if (props.disabled) {
      return
    }

    if (enforceParameterSchema.value) {
      try {
        const valid = (await Promise.all([
          validate(),
          validateParameters(),
        ])).every(value => Boolean(value))

        if (!valid) {
          return
        }
      } catch (error) {
        console.error(error)
        showToast(h(ToastParameterValidationError), 'error')
        return
      }
    }

    const request: DeploymentFlowRunCreate = {
      state: {
        type: 'scheduled',
        message: stateMessage.value,
        stateDetails: {
          scheduledTime: scheduledTime.value,
        },
      },
      tags: tags.value,
      workQueueName: workQueueName.value,
      empiricalPolicy: {
        retries: retries.value,
        retryDelay: retryDelay.value,
        maxRetries: null,
        retryDelaySeconds: null,
        retryJitterFactor: null,
      },
      name: name.value,
      parameters: parameters.value,
      jobVariables: jobVariables.value ? JSON.parse(jobVariables.value) : undefined,
      enforceParameterSchema: enforceParameterSchema.value,
    }

    emit('submit', request)
  }
</script>

<style>
.flow-run-create-form-v2 { @apply
  p-6
  rounded-default
}

.flow-run-create-form-v2__header { @apply
  flex
  items-center
  justify-between
}

.flow-run-create-form-v2__retries { @apply
  grid
  grid-cols-2
  gap-4
}

.flow-run-create-form-v2 .p-accordion__header { @apply
  mt-2
  pt-6
}
</style>