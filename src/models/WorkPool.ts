import { SelectOptionNormalized } from '@prefecthq/prefect-design'
import { BaseJobTemplateRequest } from '@/models/api/WorkPoolRequest'
import { WorkPoolStatus } from '@/models/WorkPoolStatus'
import { titleCase } from '@/utilities'

export interface IWorkPool {
  readonly id: string,
  created: Date,
  updated: Date,
  name: string,
  description: string | null,
  type: string,
  isPaused: boolean,
  isPushPool: boolean,
  isMexPool: boolean,
  defaultQueueId: string,
  concurrencyLimit: number | null,
  baseJobTemplate: BaseJobTemplateRequest,
  status: WorkPoolStatus | null,
}

export class WorkPool implements IWorkPool {
  public readonly id: string
  public readonly kind = 'workPool'
  public created: Date
  public updated: Date
  public name: string
  public description: string | null
  public type: string
  public isPaused: boolean
  public isPushPool: boolean
  public isMexPool: boolean
  public defaultQueueId: string
  public concurrencyLimit: number | null
  public baseJobTemplate: BaseJobTemplateRequest
  public status: WorkPoolStatus | null

  public constructor(workPool: IWorkPool) {
    this.id = workPool.id
    this.created = workPool.created
    this.updated = workPool.updated
    this.name = workPool.name
    this.description = workPool.description
    this.type = workPool.type
    this.isPaused = workPool.isPaused
    this.isPushPool = workPool.isPushPool
    this.isMexPool = workPool.isMexPool
    this.defaultQueueId = workPool.defaultQueueId
    this.concurrencyLimit = workPool.concurrencyLimit
    this.baseJobTemplate = workPool.baseJobTemplate
    this.status = workPool.status
  }

  public get typeLabel(): string {
    return titleCase(this.type)
  }
}

export type WorkPoolFormValues = {
  name?: string,
  description?: string | null,
  type?: string,
  isPaused?: boolean,
  concurrencyLimit?: number | null,
  baseJobTemplate?: Record<string, unknown>,
}

export type WorkPoolTypeSelectOption = SelectOptionNormalized & { logoUrl: string, description: string, isBeta: boolean }