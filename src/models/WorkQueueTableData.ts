import { IWorkQueue, WorkQueue } from '@/models/WorkQueue'

export class WorkQueueTableData extends WorkQueue {
  public disabled: boolean

  public constructor(workQueue: IWorkQueue & { disabled: boolean }) {
    super(workQueue)

    this.disabled = workQueue.disabled
  }
}