import { RunGraphData, RunGraphNode, RunGraphArtifact, RunGraphStateEvent } from '@prefecthq/graphs'
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
  return {
    id: source.id,
    created: this.map('string', source.created, 'Date'),
    key: source.key,
    type: isKnownArtifactType(source.type) ? source.type : 'unknown',
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

export const mapRunGraphDataResponse: MapFunction<RunGraphDataResponse, RunGraphData> = function(source) {
  const nodes: [string, RunGraphNode][] = source.nodes.map(([nodeId, node]) => [
    nodeId,
    this.map('RunGraphNodeResponse', node, 'RunGraphNode'),
  ])

  const artifacts: RunGraphArtifact[] = source.artifacts?.map(artifact => {
    return this.map('RunGraphArtifactResponse', artifact, 'RunGraphArtifact')
  }) ?? []

  const states: RunGraphStateEvent[] = source.states?.map(state => {
    return this.map('RunGraphStateResponse', state, 'RunGraphStateEvent')
  }) ?? []

  return {
    root_node_ids: source.root_node_ids,
    start_time: this.map('string', source.start_time, 'Date'),
    end_time: this.map('string', source.end_time, 'Date'),
    nodes: new Map(nodes),
    artifacts,
    states,
  }
}
