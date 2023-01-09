import { mapProcessTypeValueToProcessTypeLabel } from '@/utilities'

export const workPoolTypes = ['ECS', 'Kubernetes', 'GCP Cloud Run', 'Azure Container', 'Docker Container', 'Process'] as const
export type WorkPoolType = typeof workPoolTypes[number]

export interface IWorkPool {
  readonly id: string,
  created: Date,
  updated: Date,
  name: string,
  description: string | null,
  type: string,
  isPaused: boolean,
  defaultQueueId: string,
  concurrencyLimit: number | null,
}

export class WorkPool implements IWorkPool {
  public readonly id: string
  public created: Date
  public updated: Date
  public name: string
  public description: string | null
  public type: string
  public isPaused: boolean
  public defaultQueueId: string
  public concurrencyLimit: number | null

  public constructor(workPool: IWorkPool) {
    this.id = workPool.id
    this.created = workPool.created
    this.updated = workPool.updated
    this.name = workPool.name
    this.description = workPool.description
    this.type = workPool.type
    this.isPaused = workPool.isPaused
    this.defaultQueueId = workPool.defaultQueueId
    this.concurrencyLimit = workPool.concurrencyLimit
  }

  public get typeLabel(): string {
    return mapProcessTypeValueToProcessTypeLabel(this.type)
  }
}