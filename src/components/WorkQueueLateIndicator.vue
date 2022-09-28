<template>
  <p-tag v-if="flowRuns" class="work-queue-late-indicator">
    {{ tagText }}
  </p-tag>
</template>

<script lang="ts" setup>
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import { useRecentFlowRunFilter } from '@/compositions'
  import { flowRunsApiKey } from '@/services'
  import { inject } from '@/utilities/inject'

  const props = defineProps<{
    workQueueName: string,
  }>()

  const flowRunsApi = inject(flowRunsApiKey)
  const workQueueName = computed(() => props.workQueueName ? [props.workQueueName] : [])

  const flowRunFilter = useRecentFlowRunFilter({ states: ['Late'], workQueues: workQueueName })

  const flowRunsSubscription = useSubscription(flowRunsApi.getFlowRunsCount, [flowRunFilter])
  const flowRuns = computed(()=> flowRunsSubscription.response ?? [])

  const tagText = computed(() => {
    if (flowRuns.value === 1) {
      return `${flowRuns.value} Late run`
    }
    return `${flowRuns.value} Late runs`
  })
</script>

<style>
.work-queue-late-indicator { @apply
  text-xs
  bg-state-scheduled-100
  text-state-scheduled-700
  }
</style>