import { AutomationTriggerMatch } from '@/automations/types/api/triggers'
import { Require } from '@/types/utilities'
import { createTuple } from '@/utilities/tuples'

export const { values: automationTriggerEventPosture, isValue: isAutomationTriggerEventPosture } = createTuple([
  'Reactive',
  'Proactive',
])

export const DEFAULT_EVENT_TRIGGER_WITHIN = 0
export const DEFAULT_EVENT_TRIGGER_THRESHOLD = 1

export type AutomationTriggerEventPosture = typeof automationTriggerEventPosture[number]

export type IAutomationTriggerEvent = {
  posture: AutomationTriggerEventPosture,
  match: AutomationTriggerMatch,
  matchRelated: AutomationTriggerMatch,
  forEach: string[],
  after: string[],
  expect: string[],
  threshold: number,
  within?: number | undefined,
}

export class AutomationTriggerEvent implements IAutomationTriggerEvent {
  public readonly type = 'event'
  public posture: AutomationTriggerEventPosture
  public match: AutomationTriggerMatch
  public matchRelated: AutomationTriggerMatch
  public forEach: string[]
  public after: string[]
  public expect: string[]
  public threshold: number
  public within: number

  public constructor(trigger: Require<Partial<IAutomationTriggerEvent>, 'posture'>) {
    this.posture = trigger.posture
    this.match = trigger.match ?? {}
    this.matchRelated = trigger.matchRelated ?? {}
    this.forEach = trigger.forEach ?? []
    this.after = trigger.after ?? []
    this.expect = trigger.expect ?? []
    this.threshold = trigger.threshold ?? DEFAULT_EVENT_TRIGGER_THRESHOLD
    this.within = trigger.within ?? DEFAULT_EVENT_TRIGGER_WITHIN
  }
}