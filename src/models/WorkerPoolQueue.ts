export interface IWorkerPoolQueue {
  readonly id: string,
  created: Date,
  updated: Date,
  workerPoolId: string,
  name: string,
  description: string | null,
  isPaused: boolean,
  concurrencyLimit: number | null,
  priority: number,
}

export class WorkerPoolQueue implements IWorkerPoolQueue {
  public readonly id: string
  public created: Date
  public updated: Date
  public workerPoolId: string
  public name: string
  public description: string | null
  public isPaused: boolean
  public concurrencyLimit: number | null
  public priority: number

  public constructor(workerPoolQueue: IWorkerPoolQueue) {
    this.id = workerPoolQueue.id
    this.created = workerPoolQueue.created
    this.updated = workerPoolQueue.updated
    this.workerPoolId = workerPoolQueue.workerPoolId
    this.name = workerPoolQueue.name
    this.description = workerPoolQueue.description
    this.isPaused = workerPoolQueue.isPaused
    this.concurrencyLimit = workerPoolQueue.concurrencyLimit
    this.priority = workerPoolQueue.priority
  }
}