<template>
  <RadarView
    :id="flowRunId"
    class="radar-app"
    :items="graph"
    :ring-color-accessor="getRingColor"
    :edge-color-accessor="getStateColor"
    :minimum-rings="5"
    id-accessor="id"
    upstream-accessor="upstreamDependencies"
  >
    <template #node="{ node, data, selected, toggle, highlighted, collapsed, panToNode, highlightNode, selectNode }">
      <component
        :is="radarNodeComponent(data)"
        :graph-node="data"
        :toggle="toggle"
        :collapsed="collapsed"
        :highlighted="highlighted"
        :selected="selected"
        :pan-to-node="panToNode"
        :highlight-node="highlightNode"
        :select-node="selectNode"
        :downstream-nodes="node.downstreamNodes?.size"
      />
    </template>

    <template #node-placeholder>
      <RadarNodePlaceholder />
    </template>

    <template #minimap-reset-button>
      <p-button inset icon="BanIcon" size="xs" />
    </template>

    <template #minimap-zoom-in-button>
      <p-button inset icon="PlusIcon" size="xs" class="radar-app__minimap-button" />
    </template>

    <template #minimap-zoom-out-button>
      <p-button inset icon="MinusIcon" size="xs" class="radar-app__minimap-button" />
    </template>

    <template #minimap-reset-viewport-button>
      <p-button inset icon="ArrowsExpandIcon" size="xs" />
    </template>
  </RadarView>
</template>

<script lang="ts" setup>
  import { RadarView, Item } from '@prefecthq/radar'
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import RadarNodeFlowRun from '@/components/RadarNodeFlowRun.vue'
  import RadarNodePlaceholder from '@/components/RadarNodePlaceholder.vue'
  import RadarNodeSubFlowRun from '@/components/RadarNodeSubFlowRun.vue'
  import RadarNodeTaskRun from '@/components/RadarNodeTaskRun.vue'
  import { useWorkspaceApi } from '@/compositions'
  import { GraphNode } from '@/models'

  const radarNodeComponents = {
    default: RadarNodeTaskRun,
    flowRun: RadarNodeFlowRun,
    subFlowRun: RadarNodeSubFlowRun,
    taskRun: RadarNodeTaskRun,
  }

  const computedStyle = getComputedStyle(document.body)

  const props = defineProps<{
    flowRunId: string,
  }>()

  const api = useWorkspaceApi()

  const flowRunId = computed(() => {
    return props.flowRunId
  })

  const graphSubscription = useSubscription(api.flowRuns.getFlowRunsGraph, [flowRunId], { interval: 5000 })
  const flowRunSubscription = useSubscription(api.flowRuns.getFlowRun, [flowRunId], { interval: 5000 })

  const flowRunGraphNode = computed(() => {
    if (!flowRunSubscription.response) {
      return null
    }

    return new GraphNode({ upstreamDependencies: [], ...flowRunSubscription.response })
  })

  const graph = computed(() => {
    const items = (graphSubscription.response ?? []).map(node => {
      if (node.upstreamDependencies.length == 0) {
        node.upstreamDependencies.push({ inputType: 'constant', id: flowRunId.value })
      }

      return node
    })

    const root = flowRunGraphNode.value

    if (root) {
      return [flowRunGraphNode.value, ...items]
    }

    return items
  })

  const getStateColor = (item: Item): string => {
    const color = computedStyle.getPropertyValue(`--state-${item.state?.type}-500`)
    return color
  }

  const getRingColor = (): string => {
    const [hue, saturation, lightness] = computedStyle.getPropertyValue('--foreground-50').trim().split(' ').map(val => parseInt(val))
    return `hsl(${hue}deg, ${saturation}%, ${lightness}%)`
  }

  const isTaskRun = (item: GraphNode): boolean => {
    return !item.state?.stateDetails?.childFlowRunId
  }

  const isSubFlowRun = (item: GraphNode): boolean => {
    return !!item.state?.stateDetails?.childFlowRunId
  }

  const isFlowRun = (item: GraphNode): boolean => {
    return item.id == flowRunId.value
  }

  const radarNodeComponent = (item: GraphNode): typeof RadarNodeTaskRun | typeof RadarNodeSubFlowRun => {
    if (isFlowRun(item)) {
      return radarNodeComponents.flowRun
    } else if (isTaskRun(item)) {
      return radarNodeComponents.taskRun
    } else if (isSubFlowRun(item)) {
      return radarNodeComponents.subFlowRun
    }

    return radarNodeComponents.default
  }
</script>

<style>
.radar-app {
  @apply
  w-full
  h-full
}

.radar-app__minimap-button {
  @apply
  mr-1
}

.radar-app .radar__minimap-container { @apply
  bg-background-500
  dark:bg-background
}
</style>