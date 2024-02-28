<template>
  <p-tooltip
    class="work-pool-queue-status-icon"
    :text="status.tooltip"
  >
    <StatusIcon v-if="status.state === 'ready' || status.state === 'saturated'" :status="status.state" />
    <p-icon
      v-if="status.state !== 'ready' && status.state !== 'saturated'"
      :icon="status.icon"
      size="small"
      :class="classes"
    />
  </p-tooltip>
</template>

<script lang="ts" setup>
  import { Icon } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import StatusIcon from '@/components/StatusIcon.vue'
  import { useWorkPool, useFlowRuns, useFlowRunsFilter } from '@/compositions'
  import { WorkPoolQueue } from '@/models'

  const props = defineProps<{
    workPoolQueue: WorkPoolQueue,

  }>()

  const { workPool } = useWorkPool(() => props.workPoolQueue.workPoolName)

  const { filter } = useFlowRunsFilter({
    workPools: {
      name: [props.workPoolQueue.workPoolName!],
    },
    workPoolQueues: {
      name: [props.workPoolQueue.name],
    },
    flowRuns: {
      state: {
        type: ['Pending', 'Running'],
      },
    },
  })

  const { flowRuns } = useFlowRuns(filter)
  const limitReached = computed(() => {
    return props.workPoolQueue.concurrencyLimit && flowRuns.value.length >= props.workPoolQueue.concurrencyLimit
  })

  const status = computed<{
    state: 'paused' | 'ready' | 'not_ready' | 'saturated',
    icon: Icon,
    tooltip: string,
  }>(() => {
    if (limitReached.value) {
      return { state: 'saturated', icon: 'CheckCircleIcon', tooltip: 'Work queue concurrency limit reached' }
    }
    switch (props.workPoolQueue.status) {
      case 'paused':
        return { state: 'paused', icon: 'PauseCircleIcon', tooltip: 'Work queue is paused. No work will be executed.' }
      case 'ready':
        if (workPool.value?.isPushPool) {
          return { state: 'ready', icon: 'CheckCircleIcon', tooltip: 'Work queue is ready.' }
        }
        return { state: 'ready', icon: 'CheckCircleIcon', tooltip: 'Work queue has at least one actively polling worker ready to execute work.' }
      case 'not_ready':
        return { state: 'not_ready', icon: 'ExclamationCircleIcon', tooltip: 'Work queue does not have any actively polling workers ready to execute work.' }
      default:
        const exhaustiveCheck: never = props.workPoolQueue.status
        throw new Error(`Unhandled work pool queue status: ${exhaustiveCheck}`)
    }
  })

  const classes = computed(() => `work-pool-queue-status-icon--${status.value.state}`)
</script>

<style>
.work-pool-queue-status-icon--not_ready { @apply
  text-sentiment-negative
}

.work-pool-queue-status-icon--paused { @apply
  flex
  items-center
  text-subdued
}
</style>
