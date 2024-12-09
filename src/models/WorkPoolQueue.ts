import { ObjectLevelCan } from '@/models/ObjectLevelCan'
import { createTuple } from '@/utilities'

export const { values: workPoolQueueStatus, isValue: isWorkPoolQueueStatus } = createTuple(['ready', 'paused', 'not_ready'])
export type WorkPoolQueueStatus = typeof workPoolQueueStatus[number]

export function getWorkPoolQueueStatusLabel(status: WorkPoolQueueStatus): string {
  switch (status) {
    case 'not_ready':
      return 'Not Ready'
    case 'paused':
      return 'Paused'
    case 'ready':
      return 'Ready'
    default:
      const exhaustive: never = status
      throw new Error(`getWorkPoolStatusLabel missing case for ${exhaustive}`)
  }
}

export interface IWorkPoolQueue {
  readonly id: string,
  created: Date,
  updated: Date,
  workPoolId: string,
  workPoolName?: string,
  name: string,
  description: string | null,
  isPaused: boolean,
  concurrencyLimit: number | null,
  priority: number,
  lastPolled: Date | null,
  status: WorkPoolQueueStatus,
  can: ObjectLevelCan<'work_queue'>,
}

export class WorkPoolQueue implements IWorkPoolQueue {
  public readonly id: string
  public readonly kind = 'queue'
  public created: Date
  public updated: Date
  public workPoolId: string
  public workPoolName?: string
  public name: string
  public description: string | null
  public isPaused: boolean
  public concurrencyLimit: number | null
  public priority: number
  public lastPolled: Date | null
  public status: WorkPoolQueueStatus
  public can: ObjectLevelCan<'work_queue'>

  public constructor(workPoolQueue: IWorkPoolQueue) {
    this.id = workPoolQueue.id
    this.created = workPoolQueue.created
    this.updated = workPoolQueue.updated
    this.workPoolId = workPoolQueue.workPoolId
    this.workPoolName = workPoolQueue.workPoolName
    this.name = workPoolQueue.name
    this.description = workPoolQueue.description
    this.isPaused = workPoolQueue.isPaused
    this.concurrencyLimit = workPoolQueue.concurrencyLimit
    this.priority = workPoolQueue.priority
    this.lastPolled = workPoolQueue.lastPolled
    this.status = workPoolQueue.status
    this.can = workPoolQueue.can
  }
}