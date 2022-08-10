<template>
  <p-form class="work-queue-edit-form" @submit="submit">
    <p-content>
      <p-label label="Name">
        <p-text-input v-model="name" disabled />
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

      <p class="work-queue-edit-form__section-header">
        Filters
      </p>

      <p-label label="Tags (Optional)">
        <p-tags-input v-model="tags" empty-message="Add tag to filter..." />
      </p-label>

      <p-label label="Deployments (Optional)">
        <DeploymentCombobox v-model:selected="deployments" empty-message="Select deployment to filter..." />
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
  import { PLabel, PTextInput, PNumberInput, PTagsInput, PToggle, PForm } from '@prefecthq/prefect-design'
  import { useField, useForm } from 'vee-validate'
  import { computed, reactive, ref, watchEffect } from 'vue'
  import SubmitButton from './SubmitButton.vue'
  import DeploymentCombobox from '@/components/DeploymentCombobox.vue'
  import { WorkQueueUpdateRequest, WorkQueue, WorkQueueFormValues } from '@/models'

  const props = defineProps<{
    workQueue: WorkQueue,
  }>()

  const internalValue = reactive(new WorkQueueFormValues(props.workQueue))
  const { handleSubmit, isSubmitting } = useForm({ initialValues: internalValue })

  const paused = ref(props.workQueue.isPaused)
  const isActive = computed({
    get() {
      return !paused.value
    },
    set() {
      paused.value = !paused.value
    },
  })

  const name = ref(props.workQueue.name)
  const { value: description } = useField<string|null>('description')
  const { value: isPaused } = useField<boolean | undefined>('isPaused')
  const { value: concurrencyLimit } = useField<number|null>('concurrencyLimit')
  const { value: tags } = useField<string[]>('filter.tags')
  const { value: deployments } = useField<string[]>('filter.deploymentIds')

  const emit = defineEmits<{
    (event: 'submit', value: WorkQueueUpdateRequest): void,
    (event: 'cancel'): void,
  }>()

  const submit = handleSubmit(workQueueData => {
    emit('submit', workQueueData.getWorkQueueRequest())
  })
  function cancel(): void {
    emit('cancel')
  }

  watchEffect(() => {
    isPaused.value = paused.value
  })
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