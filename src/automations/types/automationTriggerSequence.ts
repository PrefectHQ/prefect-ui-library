import { AutomationTrigger } from '@/automations/types/triggers'

export interface IAutomationTriggerSequence {
  triggers: AutomationTrigger[],
  within: number,
}

export class AutomationTriggerSequence implements IAutomationTriggerSequence {
  public readonly type = 'sequence'
  public triggers: AutomationTrigger[]
  public within: number

  public constructor(trigger: Partial<IAutomationTriggerSequence>) {
    this.within = trigger.within ?? 0
    this.triggers = trigger.triggers ?? []
  }
}