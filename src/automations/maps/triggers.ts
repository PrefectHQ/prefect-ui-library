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
    })
  }

  const exhaustive: never = source
  throw new Error(`Trigger map is not exhaustive: ${(exhaustive as AutomationTriggerResponse).type}`)
}