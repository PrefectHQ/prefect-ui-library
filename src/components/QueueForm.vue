<template>
  <div class="queue-form">
    <p-label label="Name">
      <p-text-input v-model="internalValue.name" />
    </p-label>

    <p-label label="Description">
      <p-text-input v-model="internalValue.description" />
    </p-label>

    <p-label label="Status">
      <p-toggle v-model="internalValue.isPaused">
        <template #append>
          <div>
            <template v-if="internalValue.isPaused">
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

    <p>Filters</p>
    <p-label label="Tags">
      <p-tags-input v-model:tags="internalValue.filter.tags" placeholder="Add tag to filter..." />
    </p-label>

    <p-label label="Deployments">
      <DeploymentCombobox v-model:selected="internalValue.filter.deploymentIds" empty-message="Select Deployments to filter..." />
    </p-label>

    <p-label label="Flow Runners">
      <template v-for="flowRunner in internalValue.filter.flowRunnerTypes" :key="flowRunner">
        <p-checkbox v-model="internalValue.filter.flowRunnerTypes" editor="checkbox" :value="flowRunner" />
      </template>
    </p-label>
  </div>
</template>

<script lang="ts" setup>
  import { PLabel, PTextInput, PNumberInput, PTagsInput, PToggle } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import DeploymentCombobox from '@/components/DeploymentCombobox.vue'
  import { WorkQueue } from '@/models'

  const props = defineProps<{
    workQueue: WorkQueue,
  }>()

  const emit = defineEmits<{
    (event: 'update:workQueue', value: WorkQueue): void,
  }>()

  const internalValue = computed({
    get() {
      return props.workQueue
    },
    set(value: WorkQueue) {
      emit('update:workQueue', value)
    },
  })
</script>

<style>
.queue-form {
  @apply
  border-[1px]
  border-gray-300
  p-7
  rounded-lg
  flex
  flex-col
  gap-4
}
</style>