<template>
  <RadarView
    :id="flowRunId"
    class="radar-app"
    :items="graph"
    :edge-color-accessor="getStateColor"
    id-accessor="id"
    upstream-accessor="upstreamDependencies"
  >
    <template #node="{ data, selected, toggle, highlighted, collapsed, panToNode, highlightNode, selectNode }">
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
      />
    </template>

    <template #node-placeholder>
      <RadarNodePlaceholder />
    </template>

    <!--
      <template #minimap-reset-button>
      <m-icon-button class="bg--white justify-self-start mr-auto" icon="pi-restart-line" />
      </template>

      <template #minimap-zoom-in-button>
      <m-icon-button class="bg--white mr-1" icon="pi-zoom-in-line" />
      </template>

      <template #minimap-zoom-out-button>
      <m-icon-button class="bg--white mr-1" icon="pi-zoom-out-line" />
      </template>

      <template #minimap-reset-viewport-button>
      <m-icon-button class="bg--white" icon="pi-fullscreen-fill" />
      </template>
    -->
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

  const flowRunsApi = inject(flowRunsApiKey)
  const subscription = useSubscription(flowRunsApi.getFlowRunsGraph, [props.flowRunId])

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
</style>