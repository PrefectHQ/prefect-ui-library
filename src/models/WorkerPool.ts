export const workerPoolTypes = ['ECS', 'Kubernetes', 'GCP Cloud Run', 'Azure Container', 'Docker Container', 'Process'] as const
export type WorkerPoolType = typeof workerPoolTypes[number]

export interface IWorkerPool {
  readonly id: string,
  created: Date,
  updated: Date,
  name: string,
  description: string | null,
  type: string | null,
  isPaused: boolean,
  defaultQueueId: string,
  concurrencyLimit: number | null,
}

export class WorkerPool implements IWorkerPool {
  public readonly id: string
  public created: Date
  public updated: Date
  public name: string
  public description: string | null
  public type: string | null
  public isPaused: boolean
  public defaultQueueId: string
  public concurrencyLimit: number | null

  public constructor(workerPool: IWorkerPool) {
    this.id = workerPool.id
    this.created = workerPool.created
    this.updated = workerPool.updated
    this.name = workerPool.name
    this.description = workerPool.description
    this.type = workerPool.type
    this.isPaused = workerPool.isPaused
    this.defaultQueueId = workerPool.defaultQueueId
    this.concurrencyLimit = workerPool.concurrencyLimit
  }
}