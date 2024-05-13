import { WorkspaceEventsResponse } from '@/models/api/workspaceEvents'
import { WorkspaceEvents } from '@/models/workspaceEvents'
import { MapFunction } from '@/services/Mapper'

export const mapWorkspaceEventsResponseToWorkspaceEvents: MapFunction<WorkspaceEventsResponse, WorkspaceEvents> = function(source) {
  return new WorkspaceEvents({
    events: this.map('WorkspaceEventResponse', source.events, 'WorkspaceEvent'),
    nextPage: source.next_page,
    total: source.total,
  })
}