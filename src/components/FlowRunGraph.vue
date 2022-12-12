<template>
  <div v-if="(layers.length > 0)" class="flow-run-graph">
    <FlowRunGraphPixiRenderer :layers="layers" :graph-data="graphData" />
  </div>
</template>

<script lang="ts" setup>
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed, watchEffect } from 'vue'
  import FlowRunGraphPixiRenderer from '@/components/FlowRunGraphPixiRenderer.vue'
  import { useWorkspaceApi } from '@/compositions'
  import {
    ModifiedGraphNode,
    ModifiedGraphData,
    Layers
  } from '@/models'

  const props = defineProps<{
    flowRunId: string,
  }>()

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

  type LayersEngine = {
    layers: Layers,
    resetLayers: () => void,
    generateLayersFromRootNode: (
      rootNode: ModifiedGraphNode,
      nodeData: ModifiedGraphData
    ) => void,
    sortLayerNodesIntoRows: (nodeData: ModifiedGraphData) => void,
    argueOverlaps: (
      layerIndex: number,
      nodeData: ModifiedGraphData,
      nodeIds: string[],
    ) => void,
    shoveUntilLayer: (
      sourceLayerIndex: number,
      sourceRow: number,
    ) => void,
    shoveLayer: (
      sourceLayerIndex: number,
      sourceRow: number,
    ) => void,
  }
  const layersEngine: LayersEngine = {
    layers: [{}],
    resetLayers: function() {
      this.layers = [{}]
    },
    generateLayersFromRootNode: function(rootNode, nodeData) {
      const defaultRowAssignment = -1

      // place rootNode in first layer
      this.layers[0][rootNode.id] = defaultRowAssignment

      const reruns = [rootNode.id]

      while (reruns.length > 0) {
        const rerunNodeId = reruns.pop()
        const rerunNode = rerunNodeId && nodeData.find(node => node.id === rerunNodeId)

        if (rerunNode) {
          const rerunNodeLayerIndex = this.layers.findIndex(layer => {
            return layer[rerunNode.id]
          })
          rerunNode.downstreamDependencies?.forEach(dependencyId => {
            let dependencyLayerIndex = this.layers.findIndex(layer => {
              return layer[dependencyId]
            })

            if (dependencyLayerIndex > -1 && dependencyLayerIndex <= rerunNodeLayerIndex) {
              delete this.layers[dependencyLayerIndex][dependencyId]
              dependencyLayerIndex = -1
            }

            if (dependencyLayerIndex === -1) {
              if (!this.layers[rerunNodeLayerIndex + 1]) {
                this.layers[rerunNodeLayerIndex + 1] = {}
              }
              this.layers[rerunNodeLayerIndex + 1][dependencyId] = defaultRowAssignment
              reruns.push(dependencyId)
            }
          })
        }
      }
    },
    sortLayerNodesIntoRows: function(nodeData) {
      this.layers.forEach((layer, layerIndex) => {
        if (layerIndex === 0) {
          // The first layer is all root nodes, so place sequentially, we'll revisit after
          Object.keys(layer).forEach((nodeId, nodeLayerIndex) => {
            layer[nodeId] = nodeLayerIndex + 1
          })
          return
        }

        const nonFakeNodes = Object.keys(layer).filter((nodeId) => {
          const splitId = nodeId.split('__')
          return splitId[0] !== 'fakeNode'
        })

        // Place nodes in rows based on their upstream dependencies
        nonFakeNodes.forEach((nodeId) => {
          const parentLayerRows: number[] = []

          const node = findNode(nodeId, nodeData)

          if (!node) {
            console.error('Node not found', nodeId)
            return
          }

          node.upstreamDependencies.forEach((upstreamDependency) => {
            const parentLayerIndex = this.layers.findIndex((layer) => {
              return layer[upstreamDependency.id]
            })
            parentLayerRows.push(this.layers[parentLayerIndex][upstreamDependency.id])
          })
          // place in the center most row rounded down
          const parentLayerRowsRange = {
            min: Math.min(...parentLayerRows),
            max: Math.max(...parentLayerRows),
          }
          layer[nodeId] = Math.floor((parentLayerRowsRange.max - parentLayerRowsRange.min) / 2) + parentLayerRowsRange.min
        })

        // resolve overlaps
        const groupedOverlappedNodes: Record<number, string[]> = nonFakeNodes.reduce((
          acc: Record<number, string[]>,
          nodeId: string,
        ) => {
          const row = layer[nodeId]
          if (!acc[row]) {
            acc[row] = []
          }
          acc[row].push(nodeId)
          return acc
        }, {})

        Object.keys(groupedOverlappedNodes).forEach((row) => {
          const rowNumber = Number(row)
          if (groupedOverlappedNodes[rowNumber].length > 1) {
            this.argueOverlaps(
              layerIndex,
              nodeData,
              groupedOverlappedNodes[rowNumber],
            )
          }
        })
      })
    },
    argueOverlaps: function(
      layerIndex,
      nodeData,
      nodeIds,
    ) {
      const row = this.layers[layerIndex][nodeIds[0]]

      type Match = {
        id: string,
        weight: number,
      }

      // weight matches
      const matches = nodeIds.map((nodeId) => {
        const parentRows: number[] = []
        const node = findNode(nodeId, nodeData)

        node?.upstreamDependencies.forEach(upstreamDependency => {
          const parentNodeLayerIndex = this.layers.findIndex(layer => {
            return layer[upstreamDependency.id]
          })
          parentRows.push(this.layers[parentNodeLayerIndex][upstreamDependency.id])
        })

        const connectionsAbove = parentRows.filter(parentRow => parentRow > row).length
        const connectionsBelow = parentRows.filter(parentRow => parentRow < row).length
        return {
          id: nodeId,
          weight: connectionsAbove - connectionsBelow,
        }
      })

      const matchesByWeight = matches.reduce((acc: Record<number, Match[]>, match: Match) => {
        if (!acc[match.weight]) {
          acc[match.weight] = []
        }
        acc[match.weight].push(match)
        return acc
      }, {})

      Object.keys(matchesByWeight).sort((matchA, matchB) => {
        // sort so 1 and -1 come before 0
        return Math.abs(Number(matchA)) - Math.abs(Number(matchB))
      }).reverse().forEach(matchWeightKey => {
        const weight = Number(matchWeightKey)
        const matchedNodes = matchesByWeight[weight]
        const layer = this.layers[layerIndex]

        if (weight !== 0) {
          const isWeightPositionTaken = Object.keys(layer).filter((layerNodeId) => {
            return layer[layerNodeId] === row + weight
          }).length > 0

          if (isWeightPositionTaken) {
            this.shoveUntilLayer(layerIndex, row + weight)
          }

          matchedNodes.forEach(match => {
            layer[match.id] = row + weight
          })
        }

        if (matchedNodes.length < 2) {
          return
        }

        // disperse the remaining matches around the pivot row
        let nudger = 0
        let rowTracker = Number(row) + Number(weight)
        const moves = matchedNodes.map((match, matchIndex) => {
          const isCellBeforeAvailable = rowTracker === 1 || Object.keys(layer).filter(nId => layer[nId] === rowTracker - 1).length < 1
          const isCellAfterAvailable = Object.keys(layer).filter(nId => layer[nId] === rowTracker + 1).length < 1
          // if the cell before is available or the cell after is not available, seed before first
          const seedBeforeOrAfter = isCellBeforeAvailable || !isCellAfterAvailable ? 0 : 1
          nudger = matchIndex % 2 === seedBeforeOrAfter ? nudger + matchIndex : nudger - matchIndex
          return nudger
        })

        moves.forEach((moveString, moveIndex) => {
          const move = Number(moveString)
          const node = findNode(matches[moveIndex].id, nodeData)

          if (!node) {
            console.error('Node not found', matches[moveIndex].id)
            return
          }

          // we have `row`, if gap is open, take it, otherwise shove, which includes shoving all remaining moves
          const isSpaceAvailable = rowTracker + move === rowTracker
            ? true
            : rowTracker + move >= 1 && !Object.keys(layer).find(id => layer[id] === rowTracker + move)

          if (!isSpaceAvailable) {
            // shove
            this.shoveUntilLayer(
              layerIndex,
              rowTracker + move > rowTracker
                ? rowTracker + move
                : rowTracker + move + 1,
            )
            if (rowTracker + move < rowTracker) {
              rowTracker++
            }
          }

          layer[node.id] = rowTracker + move
        })
      })
    },
    shoveUntilLayer(
      sourceLayerIndex,
      sourceRow,
    ): void {
      this.layers.forEach((layer, layerIndex) => {
        if (layerIndex <= sourceLayerIndex) {
          this.shoveLayer(
            layerIndex,
            sourceRow,
          )
        }
      })
    },
    shoveLayer(
      sourceLayerIndex,
      sourceRow,
    ): void {
      Object.keys(this.layers[sourceLayerIndex]).forEach(nodeId => {
        if (this.layers[sourceLayerIndex][nodeId] >= sourceRow) {
          this.layers[sourceLayerIndex][nodeId]++
        }
      })
    },
  }

  const layers = computed(() => {
    if (graphData.value.length < 1) {
      return []
    }

    layersEngine.resetLayers()

    // compile all root nodes, build layer group from each
    graphData.value.filter(node => {
      return node.upstreamDependencies.length === 0
    }).forEach(rootNode => {
      layersEngine.generateLayersFromRootNode(rootNode, graphData.value)
    })

    layersEngine.sortLayerNodesIntoRows(graphData.value)

    return layersEngine.layers
  })


  watchEffect(() => {
    console.log({
      data: graphData.value,
      layers: layers.value,
    })
  })

  /**
   * Utility Functions
   */

  function findNode(id: string, nodeData: ModifiedGraphData): ModifiedGraphNode | undefined {
    const node = nodeData.find((node) => {
      return node.id === id
    })

    return node

    // return generated fake node
    // const [type, upstream, downstream] = id.split('__')
    // return {
    //   id,
    //   upstreamDependencies: [
    //     {
    //       id: upstream,
    //       inputType: 'task_run',
    //     },
    //   ],
    //   downstreamDependencies: [downstream],
    // }
  }
</script>

<style>
.flow-run-graph {
  width: 100%;
  height: calc(100vh - 198px);
  min-height: 600px;
}
</style>
