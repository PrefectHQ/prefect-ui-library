<template>
  <template v-if="workPoolQueue && workQueueStatus">
    <p-icon :icon="status.icon" size="small" class="work-queue-status-icon" :class="classes" />
  </template>
</template>

<script lang="ts" setup>
  import { Icon } from '@prefecthq/prefect-design'
  import { useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import { useWorkQueueStatus, useWorkspaceApi } from '@/compositions'

  const props = defineProps<{
    workQueueName: string,
    workPoolName: string,
  }>()

  const api = useWorkspaceApi()
  const workPoolQueueArgs = computed<Parameters<typeof api.workPoolQueues.getWorkPoolQueueByName> | null>(() => [props.workPoolName, props.workQueueName])

  const workPoolQueuesSubscription = useSubscriptionWithDependencies(api.workPoolQueues.getWorkPoolQueueByName, workPoolQueueArgs)
  const workPoolQueue = computed(() => workPoolQueuesSubscription.response)


  const workQueueId = computed(() => workPoolQueue.value?.id)
  const { workQueueStatus } = useWorkQueueStatus(workQueueId)
  const healthy = computed(() => workQueueStatus.value?.healthy)

  const status = computed<{ name: string, icon: Icon }>(() => {
    if (workPoolQueue.value?.isPaused) {
      return { name: 'Paused', icon: 'PauseIcon' }
    }
    if (healthy.value) {
      return { name: 'Healthy', icon: 'CheckCircleIcon' }
    }
    return { name: 'Unhealthy', icon: 'XCircleIcon' }
  })

  const classes = computed(() => `work-queue-status-icon--${status.value.name.toLowerCase()}`)
</script>
