import { IWorkPoolQueue, WorkPoolQueue } from '@/models/WorkPoolQueue'
import { IWorkQueueFilter } from '@/models/WorkQueueFilter'

export interface IWorkQueue extends IWorkPoolQueue {
  filter?: IWorkQueueFilter,
}

/** @deprecated Prefer `WorkPoolQueue` */
export class WorkQueue extends WorkPoolQueue implements IWorkQueue {
  public filter?: IWorkQueueFilter

  public get deprecated(): boolean {
    return !!this.filter
  }

  public constructor(workQueue: IWorkQueue) {
    super(workQueue)
    this.filter = workQueue.filter
  }
}
