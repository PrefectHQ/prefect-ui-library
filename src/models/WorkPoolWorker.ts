export interface IWorkPoolWorker {
  readonly id: string,
  created: Date,
  updated: Date,
  name: string,
  workPoolId: string,
  lastHeartbeatTime: Date,
}

export class WorkPoolWorker implements IWorkPoolWorker {
  public readonly id: string
  public created: Date
  public updated: Date
  public name: string
  public workPoolId: string
  public lastHeartbeatTime: Date

  public constructor(workPoolWorker: IWorkPoolWorker) {
    this.id = workPoolWorker.id
    this.created = workPoolWorker.created
    this.updated = workPoolWorker.updated
    this.name = workPoolWorker.name
    this.workPoolId = workPoolWorker.workPoolId
    this.lastHeartbeatTime = workPoolWorker.lastHeartbeatTime
  }
}