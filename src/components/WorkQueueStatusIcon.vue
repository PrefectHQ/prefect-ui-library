<template>
  <template v-if="workQueue && workQueueStatus">
    <p-icon :icon="status.icon" size="small" class="work-queue-status-icon" :class="classes" />
  </template>
</template>

<script lang="ts" setup>
  import { Icon } from '@prefecthq/prefect-design'
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import { useWorkQueueStatus, useWorkspaceApi } from '@/compositions'

  const props = defineProps<{
    workQueueName: string,
  }>()

  const api = useWorkspaceApi()

  const workQueueName = computed(()=>props.workQueueName)
  const workQueuesSubscription =  useSubscription(api.workQueues.getWorkQueueByName, [workQueueName])
  const workQueue = computed(() => workQueuesSubscription.response)

  const workQueueId = computed(()=>workQueue.value?.id)
  const workQueueStatus = useWorkQueueStatus(workQueueId)
  const healthy = computed(()=> workQueueStatus.value?.healthy)

  const status = computed<{ name: string, icon: Icon }>(()=> {
    if (workQueue.value?.isPaused) {
      return { name: 'Paused', icon: 'PauseIcon' }
    }
    if (healthy.value) {
      return { name: 'Healthy', icon: 'CheckCircleIcon' }
    }
    return { name: 'Unhealthy', icon: 'XCircleIcon' }
  })

  const classes = computed(() => `work-queue-status-icon--${status.value.name.toLowerCase()}`)
</script>

<style>
.work-queue-status-icon--healthy{ @apply
  text-state-completed-600
}

.work-queue-status-icon--unhealthy{ @apply
  text-state-failed-700
}

.work-queue-status-icon--paused{ @apply
  text-state-pending-700
}
</style>