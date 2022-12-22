<template>
  <div class="flow-run-timeline-container">
    <div class="flow-run-timeline-container__beta-badge">
      <BetaBadge />
    </div>
    <FlowRunTimeline
      v-if="graphData.length > 0"
      :graph-data="graphData"
      :is-running="isRunning"
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
  min-height: 400px;
  height: 40vh;
  max-height: 600px;
  position: relative;
}
.flow-run-timeline-container__beta-badge { @apply
  absolute
  bottom-1
  left-1
  z-10
}
</style>
