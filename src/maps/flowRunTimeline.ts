import { GraphTimelineNode } from '@prefecthq/graphs'
import { FlowRunGraphResponse } from '@/models/api/FlowRunGraphResponse'
import { MapFunction } from '@/services/Mapper'

export const mapFlowRunGraphResponseToTimelineNode: MapFunction<FlowRunGraphResponse, GraphTimelineNode> = function(source) {
  return {
    id: source.id,
    label: source.name ?? source.id,
    start: source.start_time ? this.map('string', source.start_time, 'Date') : undefined,
    end: this.map('string', source.end_time, 'Date'),
    state: source.state.name.toLocaleLowerCase(),
    upstreamDependencies: source.upstream_dependencies.map(x => x.id),
    subFlowRunId: source.state.state_details?.child_flow_run_id ?? undefined,
  }
}
