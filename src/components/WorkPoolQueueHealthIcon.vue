<template>
  <p-tooltip
    v-if="workPoolQueue && workQueueStatus && !workPool?.isPushPool"
    text="Work queue health is deprecated and will be removed in a future release. Please use work pool status instead."
  >
    <button type="button" class="work-pool-queue-health-icon">
      <StatusIcon v-if="status.state === 'healthy'" status="ready" />
      <p-icon
        v-if="status.state !== 'healthy'"
        :icon="status.icon"
        size="small"
        class="work-pool-queue-health-icon"
        :class="classes"
      />
    </button>
  </p-tooltip>
</template>

<script lang="ts">
  /** @deprecated prefer `<WorkPoolQueueStatusIcon>` */
  export default {}
</script>

<script lang="ts" setup>
  import { Icon } from '@prefecthq/prefect-design'
  import { useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import StatusIcon from '@/components/StatusIcon.vue'
  import { useInterval, useWorkQueueStatus, useWorkspaceApi, useWorkPool } from '@/compositions'

  const props = defineProps<{
    workQueueName: string,
    workPoolName: string,
  }>()

  const api = useWorkspaceApi()
  const workPoolQueueArgs = computed<[string, string] | null>(() => [props.workPoolName, props.workQueueName])
  const options = useInterval()

  const workPoolQueuesSubscription = useSubscriptionWithDependencies(api.workPoolQueues.getWorkPoolQueueByName, workPoolQueueArgs, options)
  const workPoolQueue = computed(() => workPoolQueuesSubscription.response)

  const { workPool } = useWorkPool(() => props.workPoolName)

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

  const classes = computed(() => `work-pool-queue-health-icon--${status.value.state}`)
</script>

<style>
.work-pool-queue-health-icon { @apply
  flex
  items-center
  cursor-help
}

.work-pool-queue-health-icon--unhealthy { @apply
  text-sentiment-negative
}

.work-pool-queue-health-icon--paused { @apply
  text-subdued
}
</style>
