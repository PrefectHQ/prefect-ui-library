<template>
  <p-form class="deployment-form" :loading="isSubmitting" @submit="submit" @cancel="cancel">
    <p-content>
      <p-content>
        <h3 class="deployment-form__section-header">
          General
        </h3>

        <p-label label="Name">
          <p-text-input v-model="name" disabled />
        </p-label>

        <p-label label="Description (Optional)" :state="descriptionState">
          <p-textarea v-model="description" rows="7" :state="descriptionState" />
        </p-label>

        <p-label label="Work Queue (Optional)">
          <WorkQueueCombobox v-model:selected="workQueueName" />
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
          <SchemaFormFields property="parameters" :schema="deployment.parameterOpenApiSchema" />
        </template>

        <template v-else>
          <em>This deployment's flow has no parameters</em>
        </template>
      </p-content>
    </p-content>

    <template #footer>
      <p-button inset @click="cancel">
        Cancel
      </p-button>
      <p-button type="submit" @click="submit">
        Save
      </p-button>
    </template>
  </p-form>
</template>

<script lang="ts" setup>
  import { useField, useForm } from 'vee-validate'
  import { computed } from 'vue'
  import WorkQueueCombobox from './WorkQueueCombobox.vue'
  import ScheduleFieldset from '@/components/ScheduleFieldset.vue'
  import SchemaFormFields from '@/components/SchemaFormFields.vue'
  import { Deployment, DeploymentUpdate, Schedule } from '@/models'

  const props = defineProps<{
    deployment: Deployment,
  }>()

  const hasParameters = computed(() => {
    return Object.keys(props.deployment.parameterOpenApiSchema.properties ?? {}).length > 0
  })

  const { handleSubmit, isSubmitting } = useForm<DeploymentUpdate>({
    initialValues: {
      ...props.deployment,
      schema: props.deployment.parameterOpenApiSchema,
    },
  })

  const { value: description, meta: descriptionState } = useField<string>('description')
  const { value: name } = useField<string>('name')
  const { value: schedule } = useField<Schedule | null>('schedule')
  const { value: isScheduleActive } = useField<boolean>('isScheduleActive')
  const { value: workQueueName } = useField<string | null>('workQueueName')
  const { value: tags } = useField<string[] | null>('tags')

  const emit = defineEmits<{
    (event: 'submit', value: DeploymentUpdate): void,
    (event: 'cancel'): void,
  }>()

  const submit = handleSubmit((values) => {
    emit('submit', values)
  })

  const cancel = (): void => {
    emit('cancel')
  }
</script>

<style>
.deployment-form {
  @apply
  border-[1px]
  border-gray-300
  px-6
  py-6
  rounded-lg
}

.deployment-form__section-header {
  @apply
  text-lg
  font-semibold
}

.deployment-form__schedule-tag, .deployment-form__schedule-button {
  @apply
  max-w-fit
}

.deployment-form__schedule-button-icon {
  @apply
  w-3
  h-3
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

.deployment-form__schedule-tag {
  @apply
  bg-slate-500
  text-white
  cursor-pointer
}

.deployment-form__schedule-tag .p-tag__dismiss {
  @apply
  text-slate-100
  hover:text-slate-900
}
</style>