<template>
  <p-form class="deployment-form" :loading="isSubmitting" @submit="submit" @cancel="cancel">
    <p-content>
      <p-label label="Name " :message="errors.name" :state="nameState">
        <p-text-input v-model="name" :state="nameState" />
      </p-label>

      <section class="deployment-form__schedule-section">
        <p-label label="Schedule" />

        <template v-if="schedule">
          <p-tag dismissible class="deployment-form__schedule-tag" @dismiss="removeSchedule">
            <p-icon icon="ClockIcon" />{{ schedule }}
          </p-tag>

          <p-toggle v-model="isScheduleActive" class="deployment-form__schedule-toggle">
            <template #append>
              Active
            </template>
          </p-toggle>
        </template>

        <template v-else>
          <p-button size="sm" class="deployment-form__schedule-button">
            <p-icon icon="ClockIcon" />
            Add schedule
          </p-button>
        </template>
      </section>

      <p-label label="Tags">
        <p-tags-input v-model:tags="tags" empty-message="Add tags" />
      </p-label>

      <template v-if="deployment?.parameters">
        <p-label label="Parameters" />
        <DeploymentParametersTable :parameters="deployment.parameters" />
      </template>
    </p-content>
  </p-form>
</template>

<script lang="ts" setup>
  import { useField, useForm } from 'vee-validate'
  import { computed } from 'vue'
  import DeploymentParametersTable from './DeploymentParametersTable.vue'
  import { Deployment, IDeploymentRequest, DeploymentFormValues, Schedule } from '@/models'
  import { isRequired, withMessage } from '@/services/validate'

  const props = defineProps<{
    deployment: Deployment,
  }>()

  const internalValue = computed(() => {
    return new DeploymentFormValues({
      name: name.value,
      schedule: schedule.value,
      isScheduleActive: isScheduleActive.value,
      parameters: parameters.value ?? {},
      tags: tags.value,
    })
  })

  const { handleSubmit, isSubmitting, errors } = useForm({ initialValues: props.deployment })

  const rules = {
    name: [withMessage(isRequired, 'Name is required')],
  }

  const { value: name, meta: nameState } = useField<string>('name', rules.name)
  const { value: schedule } = useField<Schedule | null>('schedule')
  const { value: isScheduleActive } = useField<boolean>('isScheduleActive')
  const { value: parameters } = useField<Record<string, unknown> | null>('parameters')
  const { value: tags } = useField<string[] | null>('tags')

  const emit = defineEmits<{
    (event: 'submit', value: IDeploymentRequest): void,
    (event: 'cancel'): void,
  }>()

  const submit = handleSubmit(() => {
    emit('submit', internalValue.value.getDeploymentRequest())
  })

  const cancel = (): void => {
    emit('cancel')
  }

  const removeSchedule = (): void => {
    schedule.value = null
    isScheduleActive.value = false
  }
</script>

<style>
.deployment-form {
  @apply border-[1px] border-gray-300 px-6 py-6 rounded-lg
}

.deployment-form__section-header {
  @apply text-base text-gray-500
}

.deployment-form__schedule-section {
  @apply
  flex
  flex-col
  gap-2
}

.deployment-form__schedule-tag, .deployment-form__schedule-button {
  @apply
  max-w-fit
}

.deployment-form__schedule-tag {
  @apply
  bg-slate-500
  text-white
}

.deployment-form__schedule-tag .p-tag__dismiss {
  @apply
  text-slate-100
  hover:text-slate-900
}
</style>