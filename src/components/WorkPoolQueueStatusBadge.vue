<template>
  <template v-if="workQueue">
    <p-tag class="work-pool-queue-status-badge">
      <WorkPoolQueueStatusIcon :work-pool-queue="workQueue" />
      {{ getWorkPoolQueueStatusLabel(workQueue.status) }}
    </p-tag>
  </template>
</template>

<script lang="ts" setup>
  import WorkPoolQueueStatusIcon from '@/components/WorkPoolQueueStatusIcon.vue'
  import { WorkPoolQueue, getWorkPoolQueueStatusLabel } from '@/models'

  defineProps<{
    workQueue: WorkPoolQueue,
  }>()
</script>

<style>
.work-pool-queue-status-badge { @apply
  text-xs
  pl-2
}
</style>