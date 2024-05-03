import { WorkspaceEventResponse } from '@/models/api/workspaceEvents'
import { WorkspaceEvent } from '@/models/workspaceEvent'
import { MapFunction } from '@/services/Mapper'

export const mapWorkspaceEventResponseToWorkspaceEvent: MapFunction<WorkspaceEventResponse, WorkspaceEvent> = function(source) {
  return new WorkspaceEvent({
    id: source.id,
    account: source.account,
    event: source.event,
    payload: source.payload,
    related: source.related,
    resource: source.resource,
    workspace: source.workspace,
    occurred: this.map('string', source.occurred, 'Date'),
    received: this.map('string', source.received, 'Date'),
  })
}