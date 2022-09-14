<template>
  <p-tag v-if="flowRuns.length" class="work-queue-late-indicator">
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

  const flowRunFilter = computed(() => useRecentFlowRunFilter({ states: ['Late'], workQueues: [props.workQueueName] }).value)

  const flowRunsSubscription = useSubscription(flowRunsApi.getFlowRuns, [flowRunFilter])
  const flowRuns = computed(()=> flowRunsSubscription.response ?? [])

  const tagText = computed(() => {
    if (flowRuns.value.length === 1) {
      return `${flowRuns.value.length} Late run`
    }
    return `${flowRuns.value.length} Late runs`
  })
</script>

<style>
.work-queue-late-indicator { @apply
  text-xs
  bg-state-scheduled-100
  text-state-scheduled-700
  }
</style>