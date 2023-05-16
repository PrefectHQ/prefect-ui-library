import { BaseJobTemplateRequest } from '@/models/api/WorkPoolRequest'
import { titleCase } from '@/utilities'
import { SelectOptionNormalized } from '@prefecthq/prefect-design'

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
  baseJobTemplate: BaseJobTemplateRequest,
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
  public baseJobTemplate: BaseJobTemplateRequest

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
    this.baseJobTemplate = workPool.baseJobTemplate
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

export type WorkPoolTypeSelectOption = SelectOptionNormalized & { logoUrl: string, description: string }