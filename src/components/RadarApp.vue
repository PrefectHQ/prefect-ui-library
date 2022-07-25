<template>
  <RadarView
    :id="flowRunId"
    class="radar-app"
    :items="graph"
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
  import RadarNodePlaceholder from '@/components/RadarNodePlaceholder.vue'
  import RadarNodeSubFlowRun from '@/components/RadarNodeSubFlowRun.vue'
  import RadarNodeTaskRun from '@/components/RadarNodeTaskRun.vue'
  import { GraphNode } from '@/models'
  import { flowRunsApiKey } from '@/services'
  import { inject } from '@/utilities/inject'

  const radarNodeComponents = {
    default: RadarNodeTaskRun,
    taskRun: RadarNodeTaskRun,
    subFlowRun: RadarNodeSubFlowRun,
  }

  const computedStyle = getComputedStyle(document.body)

  const props = defineProps<{
    flowRunId: string,
  }>()

  const flowRunId = computed(() => {
    return props.flowRunId
  })

  const flowRunsApi = inject(flowRunsApiKey)
  const subscription = useSubscription(flowRunsApi.getFlowRunsGraph, [flowRunId])

  const graph = computed(() => {
    return subscription.response ?? []
  })

  const getStateColor = (item: Item): string => {
    const color = computedStyle.getPropertyValue(`--state-${item.state?.type}-500`)
    return color
  }

  const isTaskRun = (item: GraphNode): boolean => {
    return !item.state?.stateDetails?.childFlowRunId
  }

  const isSubFlowRun = (item: GraphNode): boolean => {
    return !!item.state?.stateDetails?.childFlowRunId
  }

  const radarNodeComponent = (item: GraphNode): typeof RadarNodeTaskRun | typeof RadarNodeSubFlowRun => {
    if (isTaskRun(item)) {
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
</style>