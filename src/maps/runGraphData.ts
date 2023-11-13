import { RunGraphData, RunGraphNode } from '@prefecthq/graphs'
import { RunGraphDataResponse, RunGraphNodeResponse } from '@/models/api/RunGraphDataResponse'
import { MapFunction } from '@/services/Mapper'

export const mapRunGraphNodeResponse: MapFunction<RunGraphNodeResponse, RunGraphNode> = function(source) {
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
  }
}

export const mapRunGraphDataResponse: MapFunction<RunGraphDataResponse, RunGraphData> = function(source) {
  const nodes: [string, RunGraphNode][] = source.nodes.map(([nodeId, node]) => [
    nodeId,
    this.map('RunGraphNodeResponse', node, 'RunGraphNode'),
  ])

  return {
    root_node_ids: source.root_node_ids,
    start_time: this.map('string', source.start_time, 'Date'),
    end_time: this.map('string', source.end_time, 'Date'),
    nodes: new Map(nodes),
  }
}
