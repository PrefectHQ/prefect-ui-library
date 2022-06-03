<template>
  <p-form class="queue-form" @submit="submit" @cancel="cancel">
    <p-label label="Name">
      <p-text-input v-model="internalValue.name" />
    </p-label>

    <p-label label="Description">
      <p-text-input v-model="internalValue.description" />
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

    <p-label label="Flow Run Concurrency (Optional)">
      <p-number-input v-model="internalValue.concurrencyLimit" placeholder="Unlimited" />
    </p-label>

    <p class="queue-form__section-header">
      Filters
    </p>

    <p-label label="Tags">
      <p-tags-input v-model:tags="internalValue.filter.tags" empty-message="Add tag to filter..." />
    </p-label>

    <p-label label="Deployments">
      <DeploymentCombobox v-model:selected="internalValue.filter.deploymentIds" empty-message="Select Deployments to filter..." />
    </p-label>

    <p-label label="Flow Runners">
      <FlowRunnerCheckboxes v-model:selected="internalValue.filter.flowRunnerTypes" />
    </p-label>
  </p-form>
</template>

<script lang="ts" setup>
  import { PLabel, PTextInput, PNumberInput, PTagsInput, PToggle, PForm } from '@prefecthq/prefect-design'
  import { computed, reactive, watch } from 'vue'
  import FlowRunnerCheckboxes from './FlowRunnerCheckboxes.vue'
  import DeploymentCombobox from '@/components/DeploymentCombobox.vue'
  import { IWorkQueueRequest, WorkQueue, WorkQueueFormValues } from '@/models'

  const props = defineProps<{
    workQueue?: WorkQueue,
  }>()

  const emit = defineEmits<{
    (event: 'submit', value: IWorkQueueRequest): void,
    (event: 'cancel'): void,
  }>()

  const internalValue = reactive(new WorkQueueFormValues(props.workQueue))

  const isActive = computed({
    get() {
      return !internalValue.isPaused
    },
    set() {
      internalValue.isPaused = !internalValue.isPaused
    },
  })

  function submit(): void {
    emit('submit', internalValue.getWorkQueueRequest())
  }

  function cancel(): void {
    emit('cancel')
  }

  watch(() => props.workQueue, (val) => {
    if (val) {
      Object.assign(internalValue, new WorkQueueFormValues(val))
    }
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