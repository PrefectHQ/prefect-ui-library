<template>
  <template v-if="workQueueStatus">
    <p-tag class="work-queue-status-badge" :class="classes">
      <span class="work-queue-status-badge__circle" :class="circleClasses" /> {{ label }}
    </p-tag>
  </template>
</template>

<script lang="ts" setup>
  import { computed } from '@vue/reactivity'
  import { useWorkQueueStatus } from '@/compositions'
  import { WorkQueue } from '@/models'

  const props = defineProps<{
    workQueue: WorkQueue,
  }>()

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
  const circleClasses = computed(() => `work-queue-status-badge__circle--${label.value.toLowerCase()}`)
</script>

<style>
.work-queue-status-badge { @apply
  text-xs
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

.work-queue-status-badge__circle{ @apply
  w-2
  aspect-square
  rounded-full
}

.work-queue-status-badge__circle--healthy{ @apply
  bg-state-completed-600
}

.work-queue-status-badge__circle--unhealthy{ @apply
  bg-state-failed-700
}

.work-queue-status-badge__circle--paused{ @apply
  hidden
}
</style>