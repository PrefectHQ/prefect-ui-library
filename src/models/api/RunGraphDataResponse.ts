import { RunGraphEdge, RunGraphNodeKind, StateType } from '@prefecthq/graphs'
import { ServerStateType } from '@/models/StateType'

export type RunGraphDataResponse = {
  start_time: string,
  end_time: string | null,
  root_node_ids: string[],
  nodes: [string, RunGraphNodeResponse][],
  artifacts?: RunGraphArtifactResponse[],
  states?: RunGraphStateResponse[],
}

export type RunGraphNodeResponse = {
  kind: RunGraphNodeKind,
  id: string,
  label: string,
  state_name: string,
  state_type: ServerStateType,
  start_time: string,
  end_time: string | null,
  parents: RunGraphEdge[],
  children: RunGraphEdge[],
  artifacts?: RunGraphArtifactResponse[],
}

export type RunGraphArtifactResponse = {
  id: string,
  is_latest: boolean,
  created: string,
  key: string,
  type: string,
}

export type RunGraphStateResponse = {
  id: string,
  timestamp: string,
  type: StateType,
  name: string,
}