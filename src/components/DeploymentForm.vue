<template>
  <p-form class="deployment-form" :loading="isSubmitting" @submit="submit" @cancel="cancel">
    <p-content>
      <p-content>
        <h3 class="deployment-form__section-header">
          General
        </h3>

        <p-label label="Name " :message="errors.name" :state="nameState">
          <p-text-input v-model="name" :state="nameState" />
        </p-label>

        <p-label label="Tags">
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

          <span class="deployment-form__schedule-row">
            <span v-if="schedule" class="deployment-form__schedule">
              {{ schedule?.toString({ verbose: true }) }}
            </span>

            <ScheduleFormModal :schedule="schedule" @submit="updateSchedule">
              <template #default="{ open }">

                <p-button size="xs" class="deployment-form__schedule-button" inset @click="open">
                  <p-icon icon="PencilIcon" class="deployment-form__schedule-button-icon" />
                  {{ schedule ? 'Edit' : 'Add' }}
                </p-button>

              </template>
            </ScheduleFormModal>

            <p-button v-if="schedule" size="xs" class="deployment-form__schedule-button" inset @click="removeSchedule">
              <p-icon icon="TrashIcon" class="deployment-form__schedule-button-icon" />
              Remove
            </p-button>

          </span>
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

        <sup>
          <em>Modifying deployment default parameters coming soon!</em>
        </sup>

        <template v-if="deployment?.parameters">
          <ParametersTable :parameters="deployment.parameters" />
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
  import ParametersTable from './ParametersTable.vue'
  import ScheduleFormModal from '@/components/ScheduleFormModal.vue'
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

  const updateSchedule = (formSchedule: Schedule): void => {
    // If this is a new schedule we turn it on automatically
    if (!schedule.value) {
      isScheduleActive.value = true
    }
    schedule.value = formSchedule
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