// Temporarily removed while we fix v2 of graphs

// import { TimelineData, TimelineItem } from '@prefecthq/graphs'
// import { FlowRunGraphResponse } from '@/models/api/FlowRunGraphResponse'
// import { mapper } from '@/services/Mapper'

// export function mapFlowRunGraphResponseToTimelineData(input: FlowRunGraphResponse[]): TimelineData {
//   const output = new Map<string, Partial<TimelineItem> | undefined>()

//   for (const item of input) {
//     const { downstream = [] } = output.get(item.id) ?? {}

//     const timelineItem = mapGraphResponseToTimelineItem(item, downstream)

//     output.set(item.id, timelineItem)

//     for (const id of timelineItem.upstream) {
//       const timelineItem = output.get(id) ?? {}

//       timelineItem.downstream ??= []
//       timelineItem.downstream.push(item.id)

//       output.set(id, timelineItem)
//     }
//   }

//   return output as TimelineData
// }

// function mapGraphResponseToTimelineItem(input: FlowRunGraphResponse, downstream: string[]): TimelineItem {
//   return {
//     id: input.id,
//     label: input.name ?? input.id,
//     subflowRunId: input.state.state_details?.child_flow_run_id ?? null,
//     state: input.state.name.toLowerCase(),
//     start: mapper.map('string', input.start_time, 'Date'),
//     end: mapper.map('string', input.end_time, 'Date'),
//     upstream: input.upstream_dependencies.map(dependency => dependency.id),
//     downstream,
//   }
// }