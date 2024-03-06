<template>
  <p-form class="deployment-form p-background" :loading="isSubmitting" @submit="submit" @cancel="cancel">
    <p-content>
      <p-content>
        <h3 class="deployment-form__section-header">
          General
        </h3>

        <p-label label="Name">
          <p-text-input :model-value="name" disabled />
        </p-label>

        <p-label label="Description (Optional)" :state="descriptionState">
          <p-code-input
            v-model="description"
            class="deployment-form__description-input"
            :min-lines="3"
            lang="markdown"
            show-line-numbers
            :state="descriptionState"
            :placeholder="localization.info.descriptionPlaceholder"
          />
        </p-label>

        <p-label label="Work Pool (Optional)">
          <WorkPoolCombobox v-model:selected="workPoolName" />
        </p-label>

        <p-label v-if="workPoolName" label="Work Queue (Optional)">
          <WorkPoolQueueCombobox v-model:selected="workQueueName" :work-pool-name="workPoolName" />
        </p-label>

        <p-label label="Tags (Optional)">
          <p-tags-input v-model="tags" empty-message="Add tags" />
        </p-label>
      </p-content>

      <p-divider />

      <p-content>
        <h3>
          {{ localization.info.parameters }}
        </h3>

        <SchemaInput v-model="parameters" :schema="schema" />
        <p-label label="Enforce Parameter Schema">
          <p-toggle v-model="enforceParameterSchema" :disabled="!parameters" class="deployment-form__enforce-parameter-schema-toggle" />
        </p-label>
      </p-content>
    </p-content>

    <p-divider />

    <p-content>
      <h3 class="deployment-form__section-header">
        {{ localization.info.infraOverrides }}
      </h3>
      <p-label label="Infrastructure Overrides (Optional)" :message="overrideErrorMessage" :state="overrideState">
        <JobVariableOverridesInput v-model="infrastructureOverrides" :state="overrideState" />
      </p-label>
    </p-content>

    <template #footer>
      <p-button @click="cancel">
        Cancel
      </p-button>
      <p-button primary type="submit" @click="submit">
        Save
      </p-button>
    </template>
  </p-form>
</template>

<script lang="ts" setup>
  import { useValidationObserver } from '@prefecthq/vue-compositions'
  import { useField } from 'vee-validate'
  import { computed } from 'vue'
  import { SchemaInput, WorkPoolCombobox, WorkPoolQueueCombobox, JobVariableOverridesInput } from '@/components'
  import { useForm } from '@/compositions/useForm'
  import { useOptionalPropertiesSchema } from '@/compositions/useOptionalPropertiesSchema'
  import { localization } from '@/localization'
  import { Deployment, DeploymentUpdate, DeploymentEdit } from '@/models'
  import { SchemaValues } from '@/types/schemas'
  import { stringify, isJson, fieldRules } from '@/utilities'

  const props = defineProps<{
    deployment: Deployment,
  }>()

  const name = computed(() => props.deployment.name)

  const { handleSubmit, isSubmitting } = useForm<DeploymentEdit>({
    initialValues: {
      description: props.deployment.description,
      parameters: props.deployment.parameters,
      workPoolName: props.deployment.workPoolName,
      workQueueName: props.deployment.workQueueName,
      tags: props.deployment.tags,
      schema: props.deployment.parameterOpenApiSchema,
      infrastructureOverrides: stringify(props.deployment.infrastructureOverrides),
      enforceParameterSchema: props.deployment.enforceParameterSchema,
    },
  })

  const rules = {
    infrastructureOverrides: fieldRules('Infrastructure overrides', isJson),
    jsonParameters: fieldRules('Parameters', isJson),
  }

  const { value: description, meta: descriptionState } = useField<string>('description')
  const { value: parameters } = useField<SchemaValues>('parameters')
  const { value: workPoolName } = useField<string | null>('workPoolName')
  const { value: workQueueName } = useField<string | null>('workQueueName')
  const { value: tags } = useField<string[] | null>('tags')
  const { value: infrastructureOverrides, meta: overrideState, errorMessage: overrideErrorMessage } = useField<string>('infrastructureOverrides', rules.infrastructureOverrides)
  const { value: enforceParameterSchema } = useField<boolean>('enforceParameterSchema')

  const { schema } = useOptionalPropertiesSchema(props.deployment.rawSchema)

  const emit = defineEmits<{
    (event: 'submit', value: DeploymentUpdate): void,
    (event: 'cancel'): void,
  }>()

  const { validate } = useValidationObserver()

  const submit = handleSubmit(async (values): Promise<void> => {
    const valid = await validate()

    if (!valid) {
      return
    }

    const deploymentUpdate: DeploymentUpdate = {
      ...values,
      infrastructureOverrides: JSON.parse(infrastructureOverrides.value),
    }

    emit('submit', deploymentUpdate)
  })

  const cancel = (): void => {
    emit('cancel')
  }
</script>

<style>
.deployment-form {
  @apply
  px-6
  py-6
  rounded-default
}

.deployment-form__section-header {
  @apply
  text-lg
  font-semibold
}
</style>
