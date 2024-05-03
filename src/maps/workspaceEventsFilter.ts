import { WorkspaceEventsFilterRequest } from '@/models/api/workspaceEventsFilterRequest'
import { MapFunction } from '@/services/Mapper'
import { WorkspaceEventsFilter } from '@/types/workspaceEventsFilter'
import { removeEmptyObjects } from '@/utilities/object'

export const mapWorkspaceEventsFilterToWorkspaceEventsFilterRequest: MapFunction<WorkspaceEventsFilter, WorkspaceEventsFilterRequest> = function(source) {
  const { limit, occurred, resource, related, anyResource, event, ...filter } = source

  const baseFilter = {
    occurred: {
      since: this.map('Date', occurred.since, 'string'),
      until: this.map('Date', occurred.until, 'string'),
    },
    any_resource: {
      id: anyResource?.id,
      id_prefix: anyResource?.idPrefix,
      labels: anyResource?.labels,
    },
    resource: {
      id: resource?.id,
      id_prefix: resource?.idPrefix,
      labels: resource?.labels,
      distinct: resource?.distinct,
    },
    related: {
      id: related?.id,
      labels: related?.labels,
      resources_in_roles: related?.resourcesInRoles,
      role: related?.role,
    },
    event: {
      prefix: event?.prefix,
      name: event?.name,
      exclude_prefix: event?.excludePrefix,
      exclude_name: event?.excludeName,
    },
    ...filter,
  }

  return {
    limit,
    filter: removeEmptyObjects(baseFilter),
  }
}