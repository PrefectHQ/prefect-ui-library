import { WorkspaceEventsHistoryRequest } from '@/models/api/workspaceEventsHistoryRequest'
import { MapFunction } from '@/services/Mapper'
import { WorkspaceEventsHistory } from '@/types/workspaceEventsHistory'

export const mapEventsHistoryToEventsHistoryRequest: MapFunction<WorkspaceEventsHistory, WorkspaceEventsHistoryRequest> = function(source) {
  const { filter } = this.map('WorkspaceEventsFilter', source.filter, 'WorkspaceEventsFilterRequest')

  return {
    time_unit: source.unit,
    time_interval: source.interval,
    filter: filter,
  }
}