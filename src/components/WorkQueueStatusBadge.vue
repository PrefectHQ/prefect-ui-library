<template>
  <template v-if="workQueue && workQueueStatus">
    <p-tag class="work-queue-status-badge" :class="classes">
      <WorkQueueStatusIcon :work-queue-name="workQueueName" class="work-queue-status-badge__icon" />
      {{ label }}
    </p-tag>
  </template>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import WorkQueueStatusIcon from '@/components/WorkQueueStatusIcon.vue'
  import { useWorkQueueStatus } from '@/compositions'
  import { WorkQueue } from '@/models'

  const props = defineProps<{
    workQueue: WorkQueue,
  }>()

  const workQueueName = computed(() => props.workQueue.name)
  const workQueueId = computed(() => props.workQueue.id)
  const { workQueueStatus } = useWorkQueueStatus(workQueueId)
  const healthy = computed(() => workQueueStatus.value?.healthy)

  const label = computed(() => {
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