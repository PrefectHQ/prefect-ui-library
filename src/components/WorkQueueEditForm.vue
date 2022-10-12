<template>
  <p-form class="work-queue-edit-form" @submit="submit">
    <p-content>
      <p-label label="Name">
        <p-text-input :model-value="workQueue.name" disabled />
      </p-label>

      <p-label label="Description (Optional)">
        <p-textarea v-model="description" rows="7" />
      </p-label>

      <p-label label="Status (Optional)">
        <p-toggle v-model="isActive">
          <template #append>
            <div>
              <template v-if="isActive">
                Active
              </template>
              <template v-else>
                Paused
              </template>
            </div>
          </template>
        </p-toggle>
      </p-label>

      <p-label label="Flow Run Concurrency (Optional)">
        <p-number-input v-model="concurrencyLimit" placeholder="Unlimited" :min="0" />
      </p-label>
    </p-content>

    <template #footer>
      <p-button inset @click="cancel">
        Cancel
      </p-button>
      <SubmitButton action="Save" :loading="isSubmitting" />
    </template>
  </p-form>
</template>

<script lang="ts" setup>
  import { PLabel, PTextInput, PNumberInput, PToggle, PForm } from '@prefecthq/prefect-design'
  import { useField } from 'vee-validate'
  import { computed } from 'vue'
  import SubmitButton from './SubmitButton.vue'
  import { useForm } from '@/compositions/useForm'
  import { WorkQueueEdit, WorkQueue } from '@/models'

  const props = defineProps<{
    workQueue: WorkQueue,
  }>()

  const { handleSubmit, isSubmitting } = useForm<WorkQueueEdit>({
    initialValues: {
      description: props.workQueue.description,
      isPaused: props.workQueue.isPaused,
      concurrencyLimit: props.workQueue.concurrencyLimit,
    },
  })

  const isActive = computed({
    get() {
      return !isPaused.value
    },
    set() {
      isPaused.value = !isPaused.value
    },
  })


  const { value: description } = useField<string|null>('description')
  const { value: isPaused } = useField<boolean | undefined>('isPaused')
  const { value: concurrencyLimit } = useField<number|null>('concurrencyLimit')

  const emit = defineEmits<{
    (event: 'submit', value: WorkQueueEdit): void,
    (event: 'cancel'): void,
  }>()

  const submit = handleSubmit((values) => {
    emit('submit', values)
  })

  function cancel(): void {
    emit('cancel')
  }
</script>

<style>
.work-queue-edit-form {
@apply
  border-[1px]
  border-gray-300
  px-6
  py-6
  rounded-lg
}

.work-queue-edit-form__section-header {
  @apply
  text-base
  text-gray-500
}
</style>