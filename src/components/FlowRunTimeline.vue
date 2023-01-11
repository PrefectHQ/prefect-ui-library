<template>
  <div v-if="graphData.length > 0" class="flow-run-timeline-container">
    <div class="flow-run-timeline-container__beta-badge">
      <BetaBadge />
    </div>
    <FlowRunTimeline
      :graph-data="graphData"
      :is-running="isRunning"
      :format-time-by-seconds="formatTimeNumeric"
      :format-time-by-minutes="formatTimeShortNumeric"
      :format-date="formatDate"
    />
  </div>
</template>

<script lang="ts" setup>
  import { FlowRunTimeline, TimelineNodeData } from '@prefecthq/graphs'
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import { BetaBadge } from '@/components'
  import { useWorkspaceApi } from '@/compositions'
  import { FlowRun, isValidTimelineNodeData } from '@/models'
  import { formatTimeNumeric, formatTimeShortNumeric, formatDate } from '@/utilities'

  const props = defineProps<{
    flowRun: FlowRun,
  }>()

  const isRunning = computed(() => {
    return props.flowRun.state?.name.toLowerCase() === 'running'
  })

  const api = useWorkspaceApi()

  const graphSubscription = useSubscription(
    api.flowRuns.getFlowRunsTimeline,
    [props.flowRun.id],
    { interval: isRunning.value ? 5000 : undefined },
  )

  const graphData = computed(() => {
    const items: TimelineNodeData[] = (graphSubscription.response ?? [])
      .filter((node): node is TimelineNodeData => isValidTimelineNodeData(node))
      .sort((nodeA, nodeB) => {
        return nodeA.start.getTime() - nodeB.start.getTime()
      })

    return items
  })
</script>

<style>
.flow-run-timeline-container {
  min-height: 300px;
  height: 40vh;
  position: relative;
}
.flow-run-timeline-container__beta-badge { @apply
  absolute
  bottom-1
  left-1
  z-10
}
</style>
