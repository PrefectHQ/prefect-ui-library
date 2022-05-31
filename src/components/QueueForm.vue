<template>
  <p>Edit Work Queue</p>
  <p>Fill out the details below</p>
  <div>
    <p-label label="Name">
      <p-text-input v-model="internalValue.name" />
    </p-label>

    <p-label label="Description">
      <p-text-input v-model="internalValue.description" />
    </p-label>

    <p-label label="Status">
      <WorkQueueToggle v-model:workQueue="internalValue" />
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
        <fieldset>
          <p-checkbox v-model="internalValue.filter.flowRunnerTypes" editor="checkbox" :value="flowRunner.toUpperCase()" />
        </fieldset>
      </template>
    </p-label>
  </div>
</template>

<script lang="ts" setup>
  import { PLabel, PTextInput, PNumberInput, PTagsInput } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import DeploymentCombobox from '@/components/DeploymentCombobox.vue'
  import WorkQueueToggle from '@/components/WorkQueueToggle.vue'
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