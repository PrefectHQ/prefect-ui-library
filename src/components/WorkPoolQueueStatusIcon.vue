<template>
  <p-tooltip
    v-if="workPoolQueue && workQueueStatus"
    class="work-queue-status-icon"
    :text="tooltipText"
  >
    <div v-if="status.state === 'healthy'" class="work-queue-status-icon--healthy" />
    <p-icon
      v-if="status.state !== 'healthy'"
      :icon="status.icon"
      size="small"
      class="work-queue-status-icon"
      :class="classes"
    />
  </p-tooltip>
</template>

<script lang="ts" setup>
  import { Icon } from '@prefecthq/prefect-design'
  import { useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import { useInterval, useWorkQueueStatus, useWorkspaceApi } from '@/compositions'

  const props = defineProps<{
    workQueueName: string,
    workPoolName: string,
  }>()

  const api = useWorkspaceApi()
  const workPoolQueueArgs = computed<[string, string] | null>(() => [props.workPoolName, props.workQueueName])
  const options = useInterval()

  const workPoolQueuesSubscription = useSubscriptionWithDependencies(api.workPoolQueues.getWorkPoolQueueByName, workPoolQueueArgs, options)
  const workPoolQueue = computed(() => workPoolQueuesSubscription.response)

  const workQueueId = computed(() => workPoolQueue.value?.id)
  const { workQueueStatus } = useWorkQueueStatus(workQueueId)
  const healthy = computed(() => workQueueStatus.value?.healthy)

  const status = computed<{
    state: 'paused' | 'healthy' | 'unhealthy',
    name: string,
    icon: Icon,
  }>(() => {
    if (workPoolQueue.value?.isPaused) {
      return { state: 'paused', name: 'Paused', icon: 'PauseCircleIcon' }
    }
    if (healthy.value) {
      return { state: 'healthy', name: 'Healthy', icon: 'CheckCircleIcon' }
    }
    return { state: 'unhealthy', name: 'Unhealthy', icon: 'ExclamationCircleIcon' }
  })

  const tooltipText = computed(() => `${workPoolQueue.value?.name} work queue is ${status.value.state}`)
  const classes = computed(() => `work-queue-status-icon--${status.value.state}`)
</script>

<style>
.work-queue-status-icon { @apply
  flex
  items-center
  cursor-help
}

.work-queue-status-icon--healthy { @apply
  w-2
  h-2
  align-middle
  bg-green-500
  rounded-full
}

.work-queue-status-icon--unhealthy { @apply
  text-state-failed-500
}

.work-queue-status-icon--paused { @apply
  text-state-paused-500
}
</style>
