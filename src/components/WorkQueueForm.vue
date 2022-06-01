<template>
  <p-form class="queue-form" @submit="submit">
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
      <p-number-input v-model="internalValue.concurrencyLimit" />
    </p-label>

    <p class="queue-form__section-header">
      Filters
    </p>

    <p-label label="Tags">
      <p-tags-input v-model:tags="internalValue.filter!.tags" placeholder="Add tag to filter..." />
    </p-label>

    <p-label label="Deployments">
      <DeploymentCombobox v-model:selected="internalValue.filter!.deploymentIds" empty-message="Select Deployments to filter..." />
    </p-label>

    <p-label label="Flow Runners">
      <p-checkbox v-for="runner in flowRunnerTypes" :key="runner.value" v-model="internalValue.filter!.flowRunnerTypes" :label="runner.label" :value="runner.value" />
    </p-label>
  </p-form>
</template>

<script lang="ts" setup>
  import { PLabel, PTextInput, PNumberInput, PTagsInput, PToggle, PForm } from '@prefecthq/prefect-design'
  import { computed, reactive } from 'vue'
  import DeploymentCombobox from '@/components/DeploymentCombobox.vue'
  import { IWorkQueue, WorkQueue } from '@/models'
  import { FlowRunnerType } from '@/types/FlowRunnerType'

  const props = defineProps<{
    workQueue?: WorkQueue,
  }>()

  const emit = defineEmits<{
    (event: 'submit', value: Partial<IWorkQueue>): void,
  }>()

  const internalValue = reactive({ ...props.workQueue })

  const isActive = computed({
    get() {
      return !internalValue.isPaused
    },
    set() {
      internalValue.isPaused = !internalValue.isPaused
    },
  })

  const flowRunnerTypes: { label: string, value: FlowRunnerType }[] = [
    { label: 'Universal', value: 'universal' },
    { label: 'Kubernetes', value: 'kubernetes' },
    { label: 'Docker', value: 'docker' },
    { label: 'Subprocess', value: 'subprocess' },
  ]

  function submit(): void {
    emit('submit', internalValue)
  }
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