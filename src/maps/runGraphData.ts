import { RunGraphData, RunGraphNode, RunGraphArtifact, RunGraphStateEvent, RunGraphNodes } from '@prefecthq/graphs'
import { RunGraphDataResponse, RunGraphNodeResponse, RunGraphArtifactResponse, RunGraphStateResponse } from '@/models/api/RunGraphDataResponse'
import { MapFunction } from '@/services/Mapper'
import { isKnownArtifactType } from '@/types/artifact'

export const mapRunGraphNodeResponse: MapFunction<RunGraphNodeResponse, RunGraphNode> = function(source) {
  const artifacts: RunGraphArtifact[] = source.artifacts?.map(artifact => {
    return this.map('RunGraphArtifactResponse', artifact, 'RunGraphArtifact')
  }) ?? []

  return {
    kind: source.kind,
    id: source.id,
    label: source.label,
    state_type: source.state_type,
    state_name: source.state_name,
    start_time: this.map('string', source.start_time, 'Date'),
    end_time: this.map('string', source.end_time, 'Date'),
    parents: source.parents,
    children: source.children,
    artifacts,
  }
}

export const mapRunGraphArtifactResponse: MapFunction<RunGraphArtifactResponse, RunGraphArtifact> = function(source) {
  const inputType = isKnownArtifactType(source.type) ? source.type : 'unknown'
  if (inputType === 'progress') {
    return {
      id: source.id,
      created: this.map('string', source.created, 'Date'),
      key: source.key,
      type: 'progress',
      data: source.data ?? 0,
    }
  }

  return {
    id: source.id,
    created: this.map('string', source.created, 'Date'),
    key: source.key,
    type: inputType,
  }
}

export const mapRunGraphStateResponse: MapFunction<RunGraphStateResponse, RunGraphStateEvent> = function(source) {
  return {
    id: source.id,
    timestamp: this.map('string', source.timestamp, 'Date'),
    type: source.type,
    name: source.name,
  }
}

type FlowRunGraphResponseSource = {
  graph: RunGraphDataResponse,
  nestedTaskRunGraphs: boolean,
}

export const mapRunGraphDataResponse: MapFunction<FlowRunGraphResponseSource, RunGraphData> = function(source) {
  const { graph, nestedTaskRunGraphs } = source

  const nodes: RunGraphNodes = new Map(graph.nodes.map(([nodeId, node]) => [
    nodeId,
    this.map('RunGraphNodeResponse', node, 'RunGraphNode'),
  ]))

  const nested_task_run_graphs = new Map<string, RunGraphData>()

  if (nestedTaskRunGraphs) {

    const nodesToDelete: string[] = []

    // separate out nested task run nodes into separate run graphs
    for (const [nodeId, response] of graph.nodes) {
      if (response.encapsulating?.length !== 1) {
        continue
      }

      // if a node is nested under more than one node we skip it and just display it like a normal node
      // this is an edge case and bill, craig, and jake decided that was the simplest solution for now.
      const parentRunId = response.encapsulating[0].id
      const parentNode = nodes.get(parentRunId)
      const node = nodes.get(nodeId)

      if (!parentNode) {
        throw new Error('parent node not found')
      }

      if (!node) {
        throw new Error('node not found')
      }

      const parentRunGraph = nested_task_run_graphs.get(parentRunId) ?? createRunGraphDataForNode(parentNode, nested_task_run_graphs)

      parentRunGraph.nodes.set(nodeId, node)

      if (graph.root_node_ids.includes(nodeId)) {
        parentRunGraph.root_node_ids.push(nodeId)
      }

      nested_task_run_graphs.set(parentRunId, parentRunGraph)

      // we want to remove the nested node from the root graph
      nodesToDelete.push(nodeId)
    }

    for (const node of nodesToDelete) {
      nodes.delete(node)
    }

  }

  const artifacts: RunGraphArtifact[] = graph.artifacts?.map(artifact => {
    return this.map('RunGraphArtifactResponse', artifact, 'RunGraphArtifact')
  }) ?? []

  const states: RunGraphStateEvent[] = graph.states?.map(state => {
    return this.map('RunGraphStateResponse', state, 'RunGraphStateEvent')
  }) ?? []

  return {
    root_node_ids: graph.root_node_ids,
    start_time: this.map('string', graph.start_time, 'Date'),
    end_time: this.map('string', graph.end_time, 'Date'),
    nodes,
    artifacts,
    states,
    nested_task_run_graphs,
  }
}

function createRunGraphDataForNode(node: RunGraphNode, nested_task_run_graphs: Map<string, RunGraphData>): RunGraphData {
  return {
    root_node_ids: [],
    start_time: node.start_time,
    end_time: node.end_time,
    nodes: new Map(),
    nested_task_run_graphs,
  }
}
