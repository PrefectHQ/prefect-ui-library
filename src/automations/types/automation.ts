export interface IAutomation {
  id: string,
  name: string,
  description: string,
  enabled: boolean,
}

export class Automation {
  public id: string
  public name: string
  public description: string
  public enabled: boolean

  public constructor(automation: IAutomation) {
    this.id = automation.id
    this.name = automation.name
    this.description = automation.description
    this.enabled = automation.enabled
  }
}