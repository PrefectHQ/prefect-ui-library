import { IWorkPoolQueue, WorkPoolQueue } from '@/models/WorkPoolQueue'

export interface IWorkQueue extends IWorkPoolQueue {
  filter?: unknown,
}

/** @deprecated Prefer `WorkPoolQueue` */
export class WorkQueue extends WorkPoolQueue implements IWorkQueue {
  public filter?: unknown

  public get deprecated(): boolean {
    return !!this.filter
  }

  public constructor(workQueue: IWorkQueue) {
    super(workQueue)
    this.filter = workQueue.filter
  }
}
