/* eslint-disable camelcase */
import { asArray } from '@prefecthq/prefect-design'
import { AutomationTriggerMatch, AutomationTriggerResponse, EventResourceValue, isAutomationTriggerEventResponse } from '@/automations/types/api/triggers'
import { AutomationTriggerEvent } from '@/automations/types/automationTriggerEvent'
import { AutomationTrigger } from '@/automations/types/triggers'
import { MapFunction } from '@/schemas/mapper'
import { EventNameFilter, EventRelatedFilter, EventResourceFilter, WorkspaceEventsFilter } from '@/types'
import { dateFunctions } from '@/utilities/timezone'

export const mapAutomationTriggerResponseToAutomationTrigger: MapFunction<AutomationTriggerResponse, AutomationTrigger> = function(source) {
  if (isAutomationTriggerEventResponse(source)) {
    return new AutomationTriggerEvent({
      posture: source.posture,
      threshold: source.threshold,
      match: source.match,
      matchRelated: source.match_related,
      forEach: source.for_each,
      after: source.after,
      expect: source.expect,
      within: source.within,
    })
  }

  const exhaustive: never = source
  throw new Error(`Trigger map is not exhaustive: ${(exhaustive as AutomationTriggerResponse).type}`)
}

export const mapAutomationTriggerToAutomationTriggerRequest: MapFunction<AutomationTrigger, AutomationTriggerResponse> = function(source) {
  return {
    type: 'event',
    match: source.match,
    match_related: source.matchRelated,
    after: source.after,
    expect: source.expect,
    for_each: source.forEach,
    posture: source.posture,
    threshold: source.threshold,
    within: source.within,
  }
}

export const mapAutomationTriggerEventToWorkspaceEventFilter: MapFunction<AutomationTriggerEvent, WorkspaceEventsFilter> = (trigger) => {
  const relatedEvents = trigger.expect.concat(trigger.after)
  const eventExcludePrefixes = ['prefect.log.write', 'prefect.task-run.']
  const event = relatedEvents.reduce<EventNameFilter>((filter, eventNamePattern) => {
    if (eventNamePattern.endsWith('*')) {
      filter.prefix ??= []
      filter.prefix.push(eventNamePattern.slice(0, -1))
    } else {
      filter.name ??= []
      filter.name.push(eventNamePattern)
    }
    filter.excludePrefix = eventExcludePrefixes
    return filter
  }, {})

  return {
    event,
    resource: mapAutomationTriggerMatchToEventResourceFilter(trigger.match),
    related: mapAutomationTriggerMatchToEventRelatedFilter(trigger.matchRelated),
    occurred: {
      since: dateFunctions.startOfWeek(new Date()),
      until: dateFunctions.endOfWeek(new Date()),
    },
  }
}

function mapAutomationTriggerMatchToEventResourceFilter(match: AutomationTriggerMatch): EventResourceFilter {
  const { ['prefect.resource.id']: idPatterns, ...labels } = match
  const { id, idPrefix } = getFilterPrefixFromPattern(idPatterns)
  return { id, idPrefix, labels }
}

function mapAutomationTriggerMatchToEventRelatedFilter(match: AutomationTriggerMatch): EventRelatedFilter {
  const { ['prefect.resource.id']: idPatterns, ...labels } = match
  const { id } = getFilterPrefixFromPattern(idPatterns)
  const role = match['prefect.resource.role'] ? asArray(match['prefect.resource.role']) : undefined
  return { id, role, labels }
}

function getFilterPrefixFromPattern(idPatterns: EventResourceValue): { id: string[], idPrefix: string[] } {
  const id: string[] = []
  const idPrefix: string[] = []
  if (idPatterns) {
    for (const pattern of asArray(idPatterns)) {
      if (pattern.endsWith('*')) {
        idPrefix.push(pattern.slice(0, -1))
      } else {
        id.push(pattern)
      }
    }
  }
  return { id, idPrefix }
}