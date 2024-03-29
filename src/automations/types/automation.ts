import { AutomationAction } from '@/automations/types/actions'

export interface IAutomation {
  id: string,
  name: string,
  description: string,
  // trigger: AutomationTrigger,
  actions: AutomationAction[],
  enabled: boolean,
}

export class Automation {
  public id: string
  public name: string
  public description: string
  // public trigger: AutomationTrigger
  public actions: AutomationAction[]
  public enabled: boolean

  public constructor(automation: IAutomation) {
    this.id = automation.id
    this.name = automation.name
    this.description = automation.description
    // this.trigger = automation.trigger
    this.actions = automation.actions
    this.enabled = automation.enabled
  }
}