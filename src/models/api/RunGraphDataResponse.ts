import { RunGraphEdge, RunGraphNodeKind } from '@prefecthq/graphs'
import { ServerStateType } from '@/models/StateType'

export type RunGraphDataResponse = {
  start_time: string,
  end_time: string | null,
  root_node_ids: string[],
  nodes: [string, RunGraphNodeResponse][],
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
}
