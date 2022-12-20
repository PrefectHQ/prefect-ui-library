export interface IWorkerPoolWorker {
  readonly id: string,
  created: Date,
  updated: Date,
  name: string,
  workerPoolId: string,
  lastHeartbeatTime: Date,
}

export class WorkerPoolWorker implements IWorkerPoolWorker {
  public readonly id: string
  public created: Date
  public updated: Date
  public name: string
  public workerPoolId: string
  public lastHeartbeatTime: Date

  public constructor(workerPoolWorker: IWorkerPoolWorker) {
    this.id = workerPoolWorker.id
    this.created = workerPoolWorker.created
    this.updated = workerPoolWorker.updated
    this.name = workerPoolWorker.name
    this.workerPoolId = workerPoolWorker.workerPoolId
    this.lastHeartbeatTime = workerPoolWorker.lastHeartbeatTime
  }
}