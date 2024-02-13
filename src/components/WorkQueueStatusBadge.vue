<template>
  <template v-if="workQueue && workQueueStatus">
    <p-tag class="work-queue-status-badge" :class="classes">
      <WorkPoolQueueStatusIcon v-if="can.access.workQueueStatus" :work-pool-queue="workQueue" />
      <WorkQueueStatusIcon v-else :work-queue-name="workQueueName" class="work-queue-status-badge__icon" />
      {{ label }}
    </p-tag>
  </template>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import WorkPoolQueueStatusIcon from '@/components/WorkPoolQueueStatusIcon.vue'
  import WorkQueueStatusIcon from '@/components/WorkQueueStatusIcon.vue'
  import { useCan, useWorkQueueStatus } from '@/compositions'
  import { WorkQueue } from '@/models'

  const props = defineProps<{
    workQueue: WorkQueue,
  }>()

  const can = useCan()

  const workQueueName = computed(() => props.workQueue.name)
  const workQueueId = computed(() => props.workQueue.id)
  const { workQueueStatus } = useWorkQueueStatus(workQueueId)
  const healthy = computed(() => workQueueStatus.value?.healthy)

  const label = computed(() => {
    if (can.access.workQueueStatus) {
      return { 'ready': 'Ready', 'not_ready': 'Not Ready', 'paused': 'Paused' }[props.workQueue.status]
    }

    if (props.workQueue.isPaused) {
      return 'Paused'
    }
    return healthy.value ? 'Healthy' : 'Unhealthy'
  })

  const classes = computed(() => `work-queue-status-badge--${label.value.toLowerCase()}`)
</script>

<style>
.work-queue-status-badge { @apply
  text-xs
  pl-1
}
</style>