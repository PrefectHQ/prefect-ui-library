import { HistogramDataPoint } from '@prefecthq/vue-charts'
import { WorkspaceEventsCountResponse } from '@/models/api/workspaceEvents'
import { WorkspaceEventsCount } from '@/models/workspaceEventsCount'
import { MapFunction } from '@/services/Mapper'

export const mapWorkspaceEventsCountResponseToWorkspaceEventsCount: MapFunction<WorkspaceEventsCountResponse, WorkspaceEventsCount> = function(source) {
  return new WorkspaceEventsCount({
    count: source.count,
    label: source.label,
    value: source.value,
    startTime: this.map('string', source.start_time, 'Date'),
    endTime: this.map('string', source.end_time, 'Date'),
  })
}

export const mapWorkspaceEventsCountResponseToHistogramDataPoint: MapFunction<WorkspaceEventsCountResponse, HistogramDataPoint> = function(source) {
  return {
    value: source.count,
    intervalStart: this.map('string', source.start_time, 'Date'),
    intervalEnd: this.map('string', source.end_time, 'Date'),
  }
}
