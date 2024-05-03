/* eslint-disable camelcase */
import { AutomationTriggerResponse, isAutomationTriggerEventResponse } from '@/automations/types/api/triggers'
import { AutomationTriggerEvent } from '@/automations/types/automationTriggerEvent'
import { AutomationTrigger } from '@/automations/types/triggers'
import { MapFunction } from '@/schemas/mapper'

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