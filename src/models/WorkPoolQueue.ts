export type WorkPoolQueueStatus = 'ready' | 'paused' | 'not_ready'

export interface IWorkPoolQueue {
  readonly id: string,
  created: Date,
  updated: Date,
  workPoolId: string,
  workPoolName?: string,
  name: string,
  description: string | null,
  isPaused: boolean,
  concurrencyLimit: number | null,
  priority: number,
  status: WorkPoolQueueStatus,
}

export class WorkPoolQueue implements IWorkPoolQueue {
  public readonly id: string
  public created: Date
  public updated: Date
  public workPoolId: string
  public workPoolName?: string
  public name: string
  public description: string | null
  public isPaused: boolean
  public concurrencyLimit: number | null
  public priority: number
  public status: WorkPoolQueueStatus

  public constructor(workPoolQueue: IWorkPoolQueue) {
    this.id = workPoolQueue.id
    this.created = workPoolQueue.created
    this.updated = workPoolQueue.updated
    this.workPoolId = workPoolQueue.workPoolId
    this.workPoolName = workPoolQueue.workPoolName
    this.name = workPoolQueue.name
    this.description = workPoolQueue.description
    this.isPaused = workPoolQueue.isPaused
    this.concurrencyLimit = workPoolQueue.concurrencyLimit
    this.priority = workPoolQueue.priority
    this.status = workPoolQueue.status
  }
}