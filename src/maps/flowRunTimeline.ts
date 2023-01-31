import { FlowRunGraphResponse } from '@/models/api/FlowRunGraphResponse'
import { TimelineNode } from '@/models/TimelineNode'
import { MapFunction } from '@/services/Mapper'

export const mapFlowRunGraphResponseToTimelineNode: MapFunction<FlowRunGraphResponse, TimelineNode> = function(source) {
  return new TimelineNode({
    id: source.id,
    label: source.name ?? source.id,
    start: this.map('string', source.start_time, 'Date'),
    end: this.map('string', source.end_time, 'Date'),
    state: source.state.name.toLocaleLowerCase(),
    upstreamDependencies: source.upstream_dependencies.map(x => x.id),
  })
}
