import { WorkPoolWorkerStatus } from '@/models/WorkPoolWorkerStatus'

type Integration = { name: string, version: string }
type Metadata = Record<string, unknown> & { integrations?: Integration[] }

export interface IWorkPoolWorker {
  readonly id: string,
  created: Date,
  updated: Date,
  name: string,
  workPoolId: string,
  lastHeartbeatTime: Date,
  status: WorkPoolWorkerStatus,
  heartbeatIntervalSeconds: number,
  clientVersion: string | null,
  metadata: Metadata | null,
}

export class WorkPoolWorker implements IWorkPoolWorker {
  public readonly id: string
  public readonly kind = 'worker'
  public created: Date
  public updated: Date
  public name: string
  public workPoolId: string
  public lastHeartbeatTime: Date
  public status: WorkPoolWorkerStatus
  public heartbeatIntervalSeconds: number
  public clientVersion: string | null
  public metadata: Record<string, unknown> | null

  public constructor(workPoolWorker: IWorkPoolWorker) {
    this.id = workPoolWorker.id
    this.created = workPoolWorker.created
    this.updated = workPoolWorker.updated
    this.name = workPoolWorker.name
    this.workPoolId = workPoolWorker.workPoolId
    this.lastHeartbeatTime = workPoolWorker.lastHeartbeatTime
    this.status = workPoolWorker.status
    this.heartbeatIntervalSeconds = workPoolWorker.heartbeatIntervalSeconds
    this.clientVersion = workPoolWorker.clientVersion
    this.metadata = workPoolWorker.metadata
  }
}

export type PaginatedWorkPoolWorkers = {
  workers: WorkPoolWorker[],
  count: number,
  limit: number,
  page: number,
  pages: number,
}
