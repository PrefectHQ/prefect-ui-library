import { IWorkPoolQueue } from '@/models'
import { WorkPoolQueue } from '@/models/WorkPoolQueue'
export class WorkPoolQueueTableData extends WorkPoolQueue {
  public disabled: boolean

  public constructor(workPoolQueue: IWorkPoolQueue & { disabled: boolean }) {
    super(workPoolQueue)

    this.disabled = workPoolQueue.disabled
  }
}
