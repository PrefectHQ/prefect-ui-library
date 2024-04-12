import { LocationQuery } from 'vue-router'
import { CreateAutomationQuery, isCreateEventAutomationQuery, isCreateFlowAutomationQuery, isCreateWorkPoolQueueAutomationQuery } from '@/automations/types/createAutomationQuery'
import { MapFunction } from '@/services/Mapper'
import { isEmptyObject } from '@/utilities/object'

export const mapCreateAutomationQueryToLocationQuery: MapFunction<CreateAutomationQuery, LocationQuery> = function(source): LocationQuery {
  const query: LocationQuery = {}

  if (source.actions) {
    query.actions = source.actions.map(action => encodeURIComponent(JSON.stringify(action)))
  }

  if (isCreateEventAutomationQuery(source)) {
    return {
      ...query,
      from: 'event',
      eventId: source.event.id,
      occurred: this.map('Date', source.event.occurred, 'string'),
    }
  }

  if (isCreateFlowAutomationQuery(source)) {
    return {
      ...query,
      from: 'flow',
      flowId: source.flowId,
    }
  }

  if (isCreateWorkPoolQueueAutomationQuery(source)) {
    return {
      ...query,
      from: 'workPoolQueue',
      workPoolQueueId: source.workPoolQueueId,
    }
  }

  if (isEmptyObject(query)) {
    throw new Error(`Unable to map CreateAutomationQuery to LocationQuery: ${JSON.stringify(source)}`)
  }

  return query
}