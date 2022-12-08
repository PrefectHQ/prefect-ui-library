<template>
  <div class="flow-run-graph">
    <div
      v-for="(layerGroup, layerGroupIndex) in layerGroups"
      :key="`layerGroup-${layerGroupIndex}`"
      class="flow-run-graph__layer-group"
    >
      <div
        v-for="(layer, layerIndex) in layerGroup"
        :key="`layerGroup-${layerGroupIndex}-layer-${layerIndex}`"
        class="flow-run-graph__layer"
      >
        <div
          v-for="nodeId in Object.keys(layer)"
          :key="nodeId"
          class="flow-run-graph__node"
        >
          {{ nodeId }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import { useWorkspaceApi } from '@/compositions'
  import { GraphNode } from '@/models'

  const props = defineProps<{
    flowRunId: string,
  }>()

  type DownstreamDependencies = string[]
  type ModifiedGraphNode = GraphNode & {
    downstreamDependencies?: DownstreamDependencies,
  }
  type ModifiedGraphData = ModifiedGraphNode[]
  type Layers = Record<string, number>[]
  type LayerGroups = Layers[]

  const api = useWorkspaceApi()

  const graphSubscription = useSubscription(api.flowRuns.getFlowRunsGraph, [props.flowRunId])
  const graphData = computed(() => {
    const data: ModifiedGraphData = [...graphSubscription.response ?? []]

    // fill in downstreamDependencies from upstreamDependencies
    // @TODO this should be done on the backend
    const formattedData = data.map(node => {
      const nodeClone = { ...node }
      if (
        nodeClone.upstreamDependencies.length === 1
        && nodeClone.upstreamDependencies[0].id === props.flowRunId
      ) {
        nodeClone.upstreamDependencies = []
      }

      nodeClone.upstreamDependencies.forEach(parentDependency => {
        const parentNode = data.find(dataNode => dataNode.id === parentDependency.id)
        if (!parentNode) {
          console.error('Upstream dependency node not found', parentDependency)
          return
        }

        if (!parentNode.downstreamDependencies) {
          parentNode.downstreamDependencies = []
        }
        parentNode.downstreamDependencies.push(nodeClone.id)
      })

      return nodeClone
    })

    return formattedData
  })

  const layerGroups = computed(() => {
    if (graphData.value.length < 1) {
      return []
    }

    const layerGroups: LayerGroups = []

    // compile all root nodes, build layer group from each
    graphData.value.filter(node => {
      return node.upstreamDependencies.length === 0
    }).forEach(rootNode => {
      const layers = generateLayersFromRootNode(rootNode)
      layerGroups.push(layers)
    })

    console.log(layerGroups)
    return layerGroups
  })

  function generateLayersFromRootNode(rootNode: ModifiedGraphNode): Layers {
    const defaultRowAssignment = -1
    const layers = [
      {
        [rootNode.id]: defaultRowAssignment,
        // -1 is a truthy value that means the node hasn't been placed in a row yet
      },
    ]
    const reruns = [rootNode.id]

    while (reruns.length > 0) {
      const rerunNodeId = reruns.pop()
      const rerunNode = rerunNodeId && graphData.value.find(node => node.id === rerunNodeId)

      if (rerunNode) {
        const rerunNodeLayerIndex = layers.findIndex(layer => {
          return layer[rerunNode.id]
        })
        rerunNode.downstreamDependencies?.forEach(dependencyId => {
          let dependencyLayerIndex = layers.findIndex(layer => {
            return layer[dependencyId]
          })

          if (dependencyLayerIndex > -1 && dependencyLayerIndex <= rerunNodeLayerIndex) {
            delete layers[dependencyLayerIndex][dependencyId]
            dependencyLayerIndex = -1
          }

          if (dependencyLayerIndex === -1) {
            if (!layers[rerunNodeLayerIndex + 1]) {
              layers[rerunNodeLayerIndex + 1] = {}
            }
            layers[rerunNodeLayerIndex + 1][dependencyId] = defaultRowAssignment
            reruns.push(dependencyId)
          }
        })
      }
    }

    return layers
  }
</script>

<style>
.flow-run-graph { @apply
  bg-slate-100
  rounded-lg
}
.flow-run-graph__layer-group { @apply
  flex
  flex-row
  flex-wrap
  justify-start
  items-center
  p-4
}
.flow-run-graph__layer { @apply
  flex
  flex-row
  flex-wrap
  justify-center
  items-center
  p-4
}
.flow-run-graph__node { @apply
  bg-slate-200
  rounded-lg
  p-2
  m-2
}
</style>
