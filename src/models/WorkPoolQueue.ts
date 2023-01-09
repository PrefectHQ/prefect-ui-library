export interface IWorkPoolQueue {
  readonly id: string,
  created: Date,
  updated: Date,
  workPoolId: string,
  name: string,
  description: string | null,
  isPaused: boolean,
  concurrencyLimit: number | null,
  priority: number,
}

export class WorkPoolQueue implements IWorkPoolQueue {
  public readonly id: string
  public created: Date
  public updated: Date
  public workPoolId: string
  public name: string
  public description: string | null
  public isPaused: boolean
  public concurrencyLimit: number | null
  public priority: number

  public constructor(workPoolQueue: IWorkPoolQueue) {
    this.id = workPoolQueue.id
    this.created = workPoolQueue.created
    this.updated = workPoolQueue.updated
    this.workPoolId = workPoolQueue.workPoolId
    this.name = workPoolQueue.name
    this.description = workPoolQueue.description
    this.isPaused = workPoolQueue.isPaused
    this.concurrencyLimit = workPoolQueue.concurrencyLimit
    this.priority = workPoolQueue.priority
  }
}