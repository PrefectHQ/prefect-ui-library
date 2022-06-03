<template>
  <div class="work-queue-details">
    <p-key-value label="Description" :value="workQueue.description" />

    <p-key-value label="Work Queue ID" :value="workQueue.id" />

    <p-key-value label="Flow Run Concurrency" :value="workQueue.concurrencyLimit" />

    <p-key-value label="Created" :value="formatDateTimeNumeric(workQueue.created)" />

    <p-key-value label="Tags">
      <template v-if="workQueue.filter.tags.length" #value>
        <p-tags :tags="workQueue.filter.tags" class="mt-2" />
      </template>
    </p-key-value>

    <p-key-value label="Flow Runners">
      <template #value>
        <FlowRunnerCheckboxes :selected="workQueue.filter.flowRunnerTypes" disabled />
      </template>
    </p-key-value>
  </div>
</template>

<script lang="ts" setup>
  import { formatDateTimeNumeric } from '@prefecthq/prefect-design'
  import FlowRunnerCheckboxes from '@/components/FlowRunnerCheckboxes.vue'
  import { WorkQueue } from '@/models/WorkQueue'

  defineProps<{
    workQueue: WorkQueue,
  }>()
</script>

<style>
.work-queue-details { @apply
  flex
  flex-col
  gap-3
  items-start
}

.work-queue-details__tags { @apply
  mt-1
}
</style>