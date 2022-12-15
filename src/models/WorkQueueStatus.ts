import { WorkQueueHealthPolicy } from '@/models/WorkQueueHealthPolicy'

export interface IWorkQueueStatus {
  healthy: boolean,
  lateRunsCount: number,
  lastPolled: Date | null,
  healthCheckPolicy: WorkQueueHealthPolicy,
}

export class WorkQueueStatus implements IWorkQueueStatus {
  public healthy: boolean
  public lateRunsCount: number
  public lastPolled: Date | null
  public healthCheckPolicy: WorkQueueHealthPolicy

  public constructor(workQueueStatus: IWorkQueueStatus) {
    this.healthy = workQueueStatus.healthy
    this.lateRunsCount = workQueueStatus.lateRunsCount
    this.lastPolled = workQueueStatus.lastPolled
    this.healthCheckPolicy = workQueueStatus.healthCheckPolicy
  }
}