import { BaseJobTemplate } from '@/models/BaseJobTemplate'
import { mapper } from '@/services'
import { Schema } from '@/types'

export type WorkerCollection = Record<string, Record<string, WorkerCollectionWorker>>

export interface IWorkerCollectionWorker {
  type: string,
  baseJobTemplate: BaseJobTemplate,
  description?: string,
  displayName?: string,
  documentationUrl?: string,
  installCommand?: string,
  logoUrl?: string,
  isBeta?: boolean,
}

export class WorkerCollectionWorker implements IWorkerCollectionWorker {
  public readonly type: string
  public readonly baseJobTemplate: BaseJobTemplate
  public readonly description?: string
  public readonly displayName?: string
  public readonly documentationUrl?: string
  public readonly installCommand?: string
  public readonly logoUrl?: string
  public readonly isBeta?: boolean

  private _schema?: Schema
  public get schema(): Schema | undefined {
    if (this._schema === undefined) {
      this._schema = mapper.map('SchemaResponse', this.baseJobTemplate.variables, 'Schema')
    }

    return this._schema
  }

  public constructor(worker: IWorkerCollectionWorker) {
    this.baseJobTemplate = worker.baseJobTemplate
    this.description = worker.description
    this.displayName = worker.displayName
    this.documentationUrl = worker.documentationUrl
    this.installCommand = worker.installCommand
    this.logoUrl = worker.logoUrl
    this.type = worker.type
    this.isBeta = worker.isBeta
  }
}