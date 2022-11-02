<template>
  <template v-if="workQueue && workQueueStatus">
    <p-tag class="work-queue-status-badge" :class="classes">
      <WorkQueueStatusIcon :work-queue-name="workQueueName" />
      {{ label }}
    </p-tag>
  </template>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import WorkQueueStatusIcon from './WorkQueueStatusIcon.vue'
  import { useWorkQueueStatus } from '@/compositions'
  import { WorkQueue } from '@/models'

  const props = defineProps<{
    workQueue: WorkQueue,
  }>()

  const workQueueName = computed(()=>props.workQueue.name)
  const workQueueId = computed(()=>props.workQueue.id)
  const workQueueStatus = useWorkQueueStatus(workQueueId)
  const healthy = computed(()=> workQueueStatus.value?.healthy)

  const label = computed(()=> {
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
  pl-2
}

.work-queue-status-badge--healthy { @apply
  bg-state-completed-50
  text-state-completed-600
}

.work-queue-status-badge--unhealthy { @apply
  bg-state-failed-50
  text-state-failed-700
}

.work-queue-status-badge--paused { @apply
  bg-state-pending-200
  text-state-pending-700
}
</style>