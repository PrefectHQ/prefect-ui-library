<template>
  <template v-if="workQueue">
    <p-tag class="work-pool-queue-status-badge">
      <WorkPoolQueueStatusIcon :work-pool-queue="workQueue" />
      {{ label }}
    </p-tag>
  </template>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import WorkPoolQueueStatusIcon from '@/components/WorkPoolQueueStatusIcon.vue'
  import { WorkPoolQueue } from '@/models'

  const props = defineProps<{
    workQueue: WorkPoolQueue,
  }>()

  const label = computed(() => (
    { 'ready': 'Ready', 'not_ready': 'Not Ready', 'paused': 'Paused' }[props.workQueue.status]
  ))
</script>

<style>
.work-pool-queue-status-badge { @apply
  text-xs
  pl-2
}
</style>