import { WorkspaceEventsFilterRequest } from '@/models/api/workspaceEventsFilterRequest'
import { MapFunction } from '@/services/Mapper'
import { PartialWorkspaceEventsFilter, WorkspaceEventsFilter } from '@/types/workspaceEventsFilter'
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


export const mapWorkspaceEventsFilterRequestToWorkspaceEventsFilter: MapFunction<WorkspaceEventsFilterRequest, PartialWorkspaceEventsFilter> = function(source) {
  const { limit, filter = {} } = source
  const { occurred, any_resource, resource, related, event, ...rest } = filter

  const baseFilter: PartialWorkspaceEventsFilter = {
    limit,
    anyResource: {
      id: any_resource?.id,
      idPrefix: any_resource?.id_prefix,
      labels: any_resource?.labels,
    },
    resource: {
      id: resource?.id,
      idPrefix: resource?.id_prefix,
      labels: resource?.labels,
      distinct: resource?.distinct,
    },
    related: {
      id: related?.id,
      labels: related?.labels,
      resourcesInRoles: related?.resources_in_roles,
      role: related?.role,
    },
    event: {
      prefix: event?.prefix,
      name: event?.name,
      excludePrefix: event?.exclude_prefix,
      excludeName: event?.exclude_name,
    },
    ...rest,
  }

  if (occurred?.since) {
    baseFilter.occurred ??= {}

    baseFilter.occurred.since = this.map('string', occurred.since, 'Date')
  }

  if (occurred?.until) {
    baseFilter.occurred ??= {}

    baseFilter.occurred.until = this.map('string', occurred.until, 'Date')
  }

  return removeEmptyObjects(baseFilter)
}