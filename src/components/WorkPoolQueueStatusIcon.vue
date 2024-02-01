<template>
  <p-tooltip
    class="work-pool-queue-status-icon"
    :text="status.tooltip"
  >
    <StatusIcon v-if="status.state === 'ready'" status="ready" />
    <p-icon
      v-if="status.state !== 'ready'"
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
  import { WorkPoolQueue } from '@/models'

  const props = defineProps<{
    workPoolQueue: WorkPoolQueue,
  }>()


  const status = computed<{
    state: 'paused' | 'ready' | 'not_ready',
    name: string,
    icon: Icon,
    tooltip: string,
  }>(() => {
    switch (props.workPoolQueue.status) {
      case 'paused':
        return { state: 'paused', name: 'Paused', icon: 'PauseCircleIcon', tooltip: 'Work pool queue is paused. No work will be executed.' }
      case 'ready':
        return { state: 'ready', name: 'Ready', icon: 'CheckCircleIcon', tooltip: 'Work pool queue has at least one actively polling worker ready to execute work.' }
      case 'not_ready':
        return { state: 'not_ready', name: 'Not Ready', icon: 'ExclamationCircleIcon', tooltip: 'Work pool queue does not have any actively polling workers ready to execute work.' }
      default:
        const exhaustiveCheck: never = props.workPoolQueue.status
        throw new Error(`Unhandled work pool queue status: ${exhaustiveCheck}`)
    }
  })

  const classes = computed(() => `work-pool-queue-status-icon--${status.value.state}`)
</script>

<style>
.work-pool-queue-status-icon { @apply
  cursor-help
}

.work-pool-queue-status-icon--paused { @apply
  flex
  items-center
  text-subdued
}
</style>
