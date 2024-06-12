import { AutomationTrigger } from '@/automations/types/triggers'

export type AutomationTriggerCompoundRequire = number | 'any' | 'all'

export const DEFAULT_COMPOUND_TRIGGER_REQUIRED: AutomationTriggerCompoundRequire = 'all'

export interface IAutomationTriggerCompound {
  triggers: AutomationTrigger[],
  within: number,
  require: AutomationTriggerCompoundRequire,
}

export class AutomationTriggerCompound implements IAutomationTriggerCompound {
  public readonly type = 'compound'
  public triggers: AutomationTrigger[]
  public within: number
  public require: AutomationTriggerCompoundRequire

  public constructor(trigger: Partial<IAutomationTriggerCompound>) {
    this.within = trigger.within ?? 0
    this.triggers = trigger.triggers ?? []
    this.require = trigger.require ?? DEFAULT_COMPOUND_TRIGGER_REQUIRED
  }
}