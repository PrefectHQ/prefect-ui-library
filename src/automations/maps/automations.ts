import { Automation } from '@/automations/types'
import { AutomationResponse } from '@/automations/types/api/automation'
import { MapFunction } from '@/services'

export const mapAutomationResponseToAutomation: MapFunction<AutomationResponse, Automation> = (source) => {
  return new Automation(source)
}