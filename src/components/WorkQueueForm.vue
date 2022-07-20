<template>
  <p-form class="queue-form" @submit="submit">
    <p-label label="Name " :message="errors.name" :state="nameState">
      <p-text-input v-model="name" :state="nameState" />
    </p-label>

    <p-label label="Description">
      <p-text-input v-model="description" />
    </p-label>

    <p-label label="Status">
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

    <p-label label="Flow Run Concurrency">
      <p-number-input v-model="concurrencyLimit" placeholder="Unlimited" />
    </p-label>

    <p class="queue-form__section-header">
      Filters
    </p>

    <p-label label="Tags">
      <p-tags-input v-model="tags" empty-message="Add tag to filter..." />
    </p-label>

    <p-label label="Deployments">
      <DeploymentCombobox v-model:selected="deployments" empty-message="Select Deployments to filter..." />
    </p-label>

    <p-label label="Flow Runners">
      <FlowRunnerCheckboxes v-model:selected="flowRunnerTypes" />
    </p-label>

    <template #footer>
      <p-button inset @click="cancel">
        Cancel
      </p-button>
      <p-button type="submit" :loading="isSubmitting">
        {{ submitLabel(label) }}
      </p-button>
    </template>
  </p-form>
</template>

<script lang="ts" setup>
  import { PLabel, PTextInput, PNumberInput, PTagsInput, PToggle, PForm } from '@prefecthq/prefect-design'
  import { useField, useForm } from 'vee-validate'
  import { computed, reactive, ref, watchEffect } from 'vue'
  import FlowRunnerCheckboxes from './FlowRunnerCheckboxes.vue'
  import DeploymentCombobox from '@/components/DeploymentCombobox.vue'
  import { IWorkQueueRequest, WorkQueue, WorkQueueFormValues } from '@/models'
  import { isRequired, withMessage } from '@/services/validate'
  import { FlowRunnerType } from '@/types/FlowRunnerType'
  import { submitLabel } from '@/utilities/buttons'

  const props = defineProps<{
    workQueue?: WorkQueue,
    label?: string,
  }>()

  const internalValue = reactive(new WorkQueueFormValues(props.workQueue))
  const { handleSubmit, isSubmitting, errors } = useForm({ initialValues: internalValue })

  const rules = {
    name: [withMessage(isRequired, 'Name is required')],
  }

  const paused = ref(props.workQueue?.isPaused)
  const isActive = computed({
    get() {
      return !paused.value
    },
    set() {
      paused.value = !paused.value
    },
  })

  const { value: name, meta: nameState } = useField<string>('name', rules.name)
  const { value: description } = useField<string|null>('description')
  const { value: isPaused } = useField<boolean | undefined>('isPaused')
  const { value: concurrencyLimit } = useField<number|null>('concurrencyLimit')
  const { value: tags } = useField<string[]>('filter.tags')
  const { value: deployments } = useField<string[]>('filter.deploymentIds')
  const { value: flowRunnerTypes } = useField<FlowRunnerType[]>('filter.flowRunnerTypes')

  const emit = defineEmits<{
    (event: 'submit', value: IWorkQueueRequest): void,
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
.queue-form {
  @apply
  border-[1px]
  border-gray-300
  px-6
  pb-6
  rounded-lg
}

.queue-form__section-header {
  @apply
  text-base
  text-gray-500
}
</style>