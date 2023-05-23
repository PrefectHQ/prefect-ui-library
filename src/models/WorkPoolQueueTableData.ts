import { WorkPoolQueue } from '@/models/WorkPoolQueue'
import { IWorkQueue } from '@/models/WorkQueue'

export class WorkPoolQueueTableData extends WorkPoolQueue {
  public disabled: boolean

  public constructor(workPoolQueue: IWorkQueue & { disabled: boolean }) {
    super(workPoolQueue)

    this.disabled = workPoolQueue.disabled
  }
}
