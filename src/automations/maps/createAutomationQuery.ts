import { LocationQuery } from 'vue-router'
import { CreateAutomationActionQuery, CreateAutomationQuery, CreateAutomationTriggerQuery, isCreateAutomationActionQuery, isCreateAutomationTriggerQuery, isCreateEventAutomationQuery, isCreateFlowAutomationQuery, isCreateWorkPoolAutomationQuery, isCreateWorkPoolQueueAutomationQuery } from '@/automations/types/createAutomationQuery'
import { MapFunction } from '@/services/Mapper'

export const mapCreateAutomationTriggerQueryToLocationQuery: MapFunction<CreateAutomationTriggerQuery, LocationQuery> = function(source) {
  const query: LocationQuery = {}

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

  if (isCreateWorkPoolAutomationQuery(source)) {
    return {
      ...query,
      from: 'workPool',
      workPoolId: source.workPoolId,
    }
  }

  if (isCreateWorkPoolQueueAutomationQuery(source)) {
    return {
      ...query,
      from: 'workPoolQueue',
      workPoolQueueId: source.workPoolQueueId,
    }
  }

  return query
}

export const mapCreateAutomationActionQueryToLocationQuery: MapFunction<CreateAutomationActionQuery, LocationQuery> = function(source) {
  return {
    actions: source.actions.map(action => encodeURIComponent(JSON.stringify(action))),
  }
}

export const mapCreateAutomationQueryToLocationQuery: MapFunction<CreateAutomationQuery, LocationQuery> = function(source): LocationQuery {
  let query: LocationQuery = {}

  if (isCreateAutomationActionQuery(source)) {
    query = {
      ...query,
      ...this.map('CreateAutomationActionQuery', source, 'LocationQuery'),
    }
  }

  if (isCreateAutomationTriggerQuery(source)) {
    query = {
      ...query,
      ...this.map('CreateAutomationTriggerQuery', source, 'LocationQuery'),
    }
  }

  return query
}