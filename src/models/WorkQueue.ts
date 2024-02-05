import { IWorkQueueFilter } from '@/models/WorkQueueFilter'

export interface IWorkQueue {
  readonly id: string,
  created: Date,
  updated: Date,
  name: string,
  filter?: IWorkQueueFilter,
  description: string | null,
  isPaused: boolean,
  concurrencyLimit: number | null,
  priority: number,
  workPoolId: string,
  workPoolName?: string,
  status: 'ready' | 'paused' | 'not_ready',
}

// deployments have new editable field called work_queue_name
// flow runs do as well

export class WorkQueue implements IWorkQueue {
  public readonly id: string
  public created: Date
  public updated: Date
  public name: string
  public filter?: IWorkQueueFilter
  public description: string | null
  public isPaused: boolean
  public concurrencyLimit: number | null
  public priority: number
  public workPoolId: string
  public workPoolName?: string
  public status: 'ready' | 'paused' | 'not_ready'

  public get deprecated(): boolean {
    return !!this.filter
  }

  public constructor(workQueue: IWorkQueue) {
    this.id = workQueue.id
    this.created = workQueue.created
    this.updated = workQueue.updated
    this.name = workQueue.name
    this.filter = workQueue.filter
    this.description = workQueue.description
    this.isPaused = workQueue.isPaused
    this.concurrencyLimit = workQueue.concurrencyLimit
    this.priority = workQueue.priority
    this.workPoolId = workQueue.workPoolId
    this.workPoolName = workQueue.workPoolName
    this.status = workQueue.status
  }
}