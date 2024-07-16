<template>
  <p-form class="deployment-form p-background" @submit="submit" @cancel="cancel">
    <h3 class="deployment-form__heading">
      General
    </h3>

    <p-label label="Name" :state="nameState" :message="nameError" :disabled="mode === 'update'">
      <p-text-input v-model="name" />
    </p-label>

    <p-label label="Description (Optional)">
      <p-code-input
        v-model="description"
        class="deployment-form__json"
        :min-lines="3"
        lang="markdown"
        show-line-numbers
        :placeholder="localization.info.descriptionPlaceholder"
      />
    </p-label>

    <p-label label="Work Pool (Optional)">
      <WorkPoolCombobox v-model:selected="workPoolName" allow-unset />
    </p-label>

    <p-label v-if="workPoolName" label="Work Queue (Optional)">
      <WorkPoolQueueCombobox v-model:selected="workQueueName" :work-pool-name="workPoolName" allow-unset />
    </p-label>

    <p-label label="Tags (Optional)">
      <p-tags-input v-model="tags" empty-message="Add tags" />
    </p-label>

    <p-divider />

    <template v-if="schemaHasParameters">
      <SchemaInputV2 v-model:values="parameters" :schema="schema" :errors="errors" :kinds="['none', 'json']">
        <template #default="{ kind, setKind }">
          <div class="flow-run-create-form-v2__header">
            <h3 class="deployment-form__heading">
              {{ localization.info.parameters }}
            </h3>
            <p-icon-button-menu small>
              <p-overflow-menu-item v-if="kind === 'json'" label="Use form input" @click="setKind('none')" />
              <p-overflow-menu-item v-if="kind === 'none'" label="Use JSON input" @click="setKind('json')" />
            </p-icon-button-menu>
          </div>
        </template>
      </SchemaInputV2>
    </template>

    <p-label label="Enforce Parameter Schema">
      <p-toggle v-model="enforceParameterSchema" :disabled="!parameters" />
    </p-label>

    <p-divider />

    <h3 class="deployment-form__heading">
      {{ localization.info.jobVariables }}
    </h3>
    <p-label label="Job Variables (Optional)" :message="overrideError" :state="overrideState">
      <JobVariableOverridesInput v-model="jobVariables" :state="overrideState" />
    </p-label>

    <template #footer>
      <p-button @click="cancel">
        Cancel
      </p-button>
      <p-button variant="default" type="submit">
        Save
      </p-button>
    </template>
  </p-form>
</template>

<script lang="ts" setup>
  import { showToast } from '@prefecthq/prefect-design'
  import { useValidation, useValidationObserver } from '@prefecthq/vue-compositions'
  import { computed, h, ref } from 'vue'
  import { JobVariableOverridesInput, WorkPoolCombobox, WorkPoolQueueCombobox } from '@/components'
  import ToastParameterValidationError from '@/components/ToastParameterValidationError.vue'
  import { localization } from '@/localization'
  import { Deployment, DeploymentUpdateV2 } from '@/models'
  import { DeploymentCreate } from '@/models/DeploymentCreate'
  import { SchemaInputV2 } from '@/schemas'
  import { useSchemaValidation } from '@/schemas/compositions/useSchemaValidation'
  import { stringify, isJson, isEmptyObject } from '@/utilities'

  interface Props {
    deployment: Deployment,
    mode?: 'duplicate' | 'update',
  }

  const props = withDefaults(defineProps<Props>(), {
    mode: () => 'update',
  })

  const name = ref(props.deployment.name)
  const description = ref(props.deployment.description)
  const workPoolName = ref(props.deployment.workPoolName)
  const workQueueName = ref(props.deployment.workQueueName)
  const parameters = ref(props.deployment.parameters)
  const tags = ref(props.deployment.tags)
  const jobVariables = ref(stringify(props.deployment.jobVariables))
  const enforceParameterSchema = ref(props.deployment.enforceParameterSchema)

  const schema = computed(() => {
    return { ...props.deployment.parameterOpenApiSchema, required: [] }
  })

  const schemaHasParameters = computed(() => !isEmptyObject(schema.value.properties))

  const { validate } = useValidationObserver()
  const { errors, validate: validateParameters } = useSchemaValidation(schema, parameters)
  const { state: overrideState, error: overrideError } = useValidation(jobVariables, isJson('Job variables'))
  const { state: nameState, error: nameError } = useValidation(name, (value) => {
    if (props.mode === 'update') {
      return true
    }

    if (!value) {
      return 'Name is required'
    }
    if (props.deployment.name === value) {
      return 'Name must be different from the original deployment'
    }
  })

  const emit = defineEmits<{
    (event: 'submit', value: DeploymentUpdateV2 | DeploymentCreate): void,
    (event: 'cancel'): void,
  }>()

  async function submit(): Promise<void> {
    const valid = await validate()

    if (!valid) {
      return
    }

    if (enforceParameterSchema.value) {
      try {
        const valid = await validateParameters()

        if (!valid) {
          return
        }
      } catch (error) {
        console.error(error)
        showToast(h(ToastParameterValidationError), 'error')
        return
      }
    }

    if (props.mode === 'duplicate') {
      const deploymentCreate: DeploymentCreate = {
        name: name.value,
        flowId: props.deployment.flowId,
        description: description.value,
        workPoolName: workPoolName.value,
        workQueueName: workQueueName.value,
        parameters: parameters.value,
        tags: tags.value,
        enforceParameterSchema: enforceParameterSchema.value,
        jobVariables: JSON.parse(jobVariables.value),
        parameterOpenApiSchema: props.deployment.parameterOpenApiSchema,
        manifestPath: props.deployment.manifestPath,
        path: props.deployment.path,
        version: null,
        paused: false,
        schedules: [],
        entrypoint: props.deployment.entrypoint,
        storageDocumentId: props.deployment.storageDocumentId,
        infrastructureDocumentId: props.deployment.infrastructureDocumentId,
        pullSteps: props.deployment.pullSteps,
      }
      emit('submit', deploymentCreate)
    } else {
      const deploymentUpdate: DeploymentUpdateV2 = {
        description: description.value,
        workPoolName: workPoolName.value,
        workQueueName: workQueueName.value,
        parameters: parameters.value,
        tags: tags.value,
        enforceParameterSchema: enforceParameterSchema.value,
        jobVariables: JSON.parse(jobVariables.value),
      }
      emit('submit', deploymentUpdate)
    }


  }

  const cancel = (): void => {
    emit('cancel')
  }
</script>

<style>
.deployment-form { @apply
  px-6
  py-6
  rounded-default
}

.deployment-form__heading { @apply
  text-lg
  font-semibold
}
</style>
