<template>
  <p-form class="deployment-form p-background" @submit="submit" @cancel="cancel">
    <h3 class="deployment-form__heading">
      General
    </h3>

    <p-label label="Name">
      <p-text-input :model-value="name" disabled />
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

      <p-checkbox v-model="shouldValidateParameters" label="Validate parameters before saving" />
    </template>

    <p-label label="Enforce Parameter Schema">
      <p-toggle v-model="enforceParameterSchema" :disabled="!parameters" />
    </p-label>

    <p-divider />

    <h3 class="deployment-form__heading">
      {{ localization.info.infraOverrides }}
    </h3>
    <p-label label="Infrastructure Overrides (Optional)" :message="overrideError" :state="overrideState">
      <JobVariableOverridesInput v-model="infrastructureOverrides" :state="overrideState" />
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
  import { SchemaInputV2 } from '@/schemas'
  import { useSchemaValidation } from '@/schemas/compositions/useSchemaValidation'
  import { stringify, isJson, isEmptyObject } from '@/utilities'

  const props = defineProps<{
    deployment: Deployment,
  }>()

  const name = computed(() => props.deployment.name)
  const description = ref(props.deployment.description)
  const workPoolName = ref(props.deployment.workPoolName)
  const workQueueName = ref(props.deployment.workQueueName)
  const parameters = ref(props.deployment.parameters)
  const tags = ref(props.deployment.tags)
  const infrastructureOverrides = ref(stringify(props.deployment.infrastructureOverrides))
  const enforceParameterSchema = ref(props.deployment.enforceParameterSchema)
  const shouldValidateParameters = ref(true)

  const schema = computed(() => {
    return { ...props.deployment.parameterOpenApiSchema, required: [] }
  })

  const schemaHasParameters = computed(() => !isEmptyObject(schema.value.properties))

  const { validate } = useValidationObserver()
  const { errors, validate: validateParameters } = useSchemaValidation(schema, parameters)
  const { state: overrideState, error: overrideError } = useValidation(infrastructureOverrides, isJson('Infrastructure overrides'))

  const emit = defineEmits<{
    (event: 'submit', value: DeploymentUpdateV2): void,
    (event: 'cancel'): void,
  }>()

  async function submit(): Promise<void> {
    const valid = await validate()

    if (!valid) {
      return
    }

    if (shouldValidateParameters.value) {
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

    const deploymentUpdate: DeploymentUpdateV2 = {
      description: description.value,
      workPoolName: workPoolName.value,
      workQueueName: workQueueName.value,
      parameters: parameters.value,
      tags: tags.value,
      enforceParameterSchema: enforceParameterSchema.value,
      infrastructureOverrides: JSON.parse(infrastructureOverrides.value),
    }

    emit('submit', deploymentUpdate)
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
