<template>
  <p-form class="deployment-form" :loading="pending" @submit="submit" @cancel="cancel">
    <p-content>
      <p-content>
        <h3 class="deployment-form__section-header">
          General
        </h3>

        <p-label label="Name">
          <p-text-input :model-value="name" disabled />
        </p-label>

        <p-label label="Description (Optional)">
          <p-code-input v-model="description" lang="markdown" show-line-numbers />
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
        <h3 class="deployment-form__section-header">
          Scheduling
        </h3>

        <span>
          <p-label label="Schedule" />
          <ScheduleFieldset v-model="schedule" />
        </span>

        <p-label label="Scheduler">
          <p-toggle v-model="isScheduleActive" :disabled="!schedule" class="deployment-form__schedule-toggle" />
        </p-label>
      </p-content>

      <p-divider />

      <p-content>
        <h3 class="deployment-form__section-header">
          Parameters
        </h3>

        <template v-if="hasParameters">
          <SchemaFormFields v-model="parameters" property="parameters" :schema="parameterOpenApiSchema" />
        </template>

        <template v-else>
          <em>This deployment's flow has no parameters</em>
        </template>
      </p-content>
    </p-content>

    <p-divider />

    <p-content>
      <h3 class="deployment-form__section-header">
        {{ localization.info.infraOverrides }}
      </h3>
      <p-label label="Infrastructure Overrides (Optional)" :message="infrastructureOverridesError" :state="infrastructureOverridesState">
        <JsonInput v-model="infrastructureOverrides" show-format-button />
      </p-label>
    </p-content>

    <template #footer>
      <p-button inset @click="cancel">
        Cancel
      </p-button>
      <p-button :loading="pending" type="submit">
        Save
      </p-button>
    </template>
  </p-form>
</template>

<script lang="ts" setup>
  import { useValidation, useValidationObserver } from '@prefecthq/vue-compositions'
  import { computed, ref } from 'vue'
  import { ScheduleFieldset, WorkPoolCombobox, SchemaFormFields, WorkPoolQueueCombobox, JsonInput } from '@/components'
  import { localization } from '@/localization'
  import { Deployment, DeploymentUpdate, Schedule } from '@/models'
  import { mapper } from '@/services'
  import { SchemaValues } from '@/types/schemas'
  import { stringify, isJson, fieldRules } from '@/utilities'

  const props = defineProps<{
    deployment: Deployment,
  }>()

  const hasParameters = computed(() => {
    return Object.keys(props.deployment.parameterOpenApiSchema.properties ?? {}).length > 0
  })

  const name = computed(() => props.deployment.name)

  const parameterOpenApiSchema = computed(() => {
    const { rawSchema } = props.deployment

    if (rawSchema && 'required' in rawSchema) {
      rawSchema.required = []
    }

    return mapper.map('SchemaResponse', rawSchema ?? {}, 'Schema')
  })

  const description = ref<string | null>(props.deployment.description)
  const schedule = ref<Schedule | null>(props.deployment.schedule)
  const parameters = ref<SchemaValues | undefined>(mapper.map('SchemaValuesResponse', { values: props.deployment.parameters, schema: parameterOpenApiSchema.value }, 'SchemaValues'))
  const isScheduleActive = ref<boolean>(props.deployment.isScheduleActive)
  const workPoolName = ref<string | null>(props.deployment.workPoolName)
  const workQueueName = ref<string | null>(props.deployment.workQueueName)
  const tags = ref<string[] | null>(props.deployment.tags)
  const infrastructureOverrides = ref<string>(stringify(props.deployment.infrastructureOverrides))

  const { pending, validate } = useValidationObserver()

  const rules = {
    infrastructureOverrides: fieldRules('Infrastructure overrides', isJson),
  }

  const { error: infrastructureOverridesError, state: infrastructureOverridesState } = useValidation(infrastructureOverrides, rules.infrastructureOverrides)

  const emit = defineEmits<{
    (event: 'submit', value: DeploymentUpdate): void,
    (event: 'cancel'): void,
  }>()

  const values = computed<DeploymentUpdate>(() => {
    let formValues: DeploymentUpdate = {
      description: description.value,
      schedule: schedule.value,
      isScheduleActive: isScheduleActive.value,
      workPoolName: workPoolName.value,
      workQueueName: workQueueName.value,
      tags: tags.value,
      infrastructureOverrides: JSON.parse(infrastructureOverrides.value),
    }

    if (parameters.value) {
      formValues = {
        ...formValues,
        parameters: parameters.value,
        schema: props.deployment.parameterOpenApiSchema,
      }
    }

    return formValues
  })

  const submit = async (): Promise<void> => {
    console.log('submitting', values.value)
    await new Promise(resolve => setTimeout(resolve, 5000))
    const valid = await validate()

    if (!valid) {
      return
    }

    emit('submit', values.value)
  }


  const cancel = (): void => {
    emit('cancel')
  }
</script>

<style>
.deployment-form {
  @apply
  border
  dark:border-background-600
  px-6
  py-6
  rounded-lg
}

.deployment-form__section-header {
  @apply
  text-lg
  font-semibold
}

.deployment-form__schedule-row {
  @apply
  flex
  gap-2
  items-center
}

.deployment-form__schedule {
  @apply
  text-lg
}
</style>