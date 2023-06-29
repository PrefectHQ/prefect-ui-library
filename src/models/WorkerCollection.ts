import { BaseJobTemplate } from '@/models/BaseJobTemplate'

export type WorkerCollection = Record<string, Record<string, WorkerCollectionWorker>>

export interface IWorkerCollectionWorker {
  type: string,
  defaultBaseJobTemplate: BaseJobTemplate,
  description?: string,
  displayName?: string,
  documentationUrl?: string,
  installCommand?: string,
  logoUrl?: string,
  isBeta?: boolean,
}

export class WorkerCollectionWorker implements IWorkerCollectionWorker {
  public readonly type: string
  public readonly defaultBaseJobTemplate: BaseJobTemplate
  public readonly description?: string
  public readonly displayName?: string
  public readonly documentationUrl?: string
  public readonly installCommand?: string
  public readonly logoUrl?: string
  public readonly isBeta?: boolean

  public constructor(worker: IWorkerCollectionWorker) {
    this.defaultBaseJobTemplate = worker.defaultBaseJobTemplate
    this.description = worker.description
    this.displayName = worker.displayName
    this.documentationUrl = worker.documentationUrl
    this.installCommand = worker.installCommand
    this.logoUrl = worker.logoUrl
    this.type = worker.type
    this.isBeta = worker.isBeta
  }
}