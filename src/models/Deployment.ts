import { Schedule } from '@/models/Schedule'
import { Schema, SchemaValues } from '@/types/schemas'

export interface IDeployment {
  id: string,
  created: Date,
  updated: Date,
  name: string,
  version: string,
  description: string | null,
  flowId: string,
  schedule: Schedule | null,
  isScheduleActive: boolean,
  parameters: SchemaValues,
  parameterOpenApiSchema: Schema,
  tags: string[] | null,
  manifestPath: string | null,
  path: string | null,
  entrypoint: string | null,
  storageDocumentId: string | null,
  infrastructureDocumentId: string | null,
  workQueueName: string | null,
}

export class Deployment implements IDeployment {
  public readonly id: string
  public created: Date
  public updated: Date
  public name: string
  public version: string
  public description: string | null
  public readonly flowId: string
  public schedule: Schedule | null
  public isScheduleActive: boolean
  public parameters: SchemaValues
  public parameterOpenApiSchema: Schema
  public tags: string[] | null
  public manifestPath: string | null
  public path: string | null
  public entrypoint: string | null
  public storageDocumentId: string | null
  public infrastructureDocumentId: string | null
  public workQueueName: string | null

  public constructor(deployment: IDeployment) {
    this.id = deployment.id
    this.created = deployment.created
    this.updated = deployment.updated
    this.name = deployment.name
    this.version = deployment.version
    this.description = deployment.description
    this.flowId = deployment.flowId
    this.schedule = deployment.schedule
    this.isScheduleActive = deployment.isScheduleActive
    this.parameters = deployment.parameters
    this.parameterOpenApiSchema = deployment.parameterOpenApiSchema
    this.tags = deployment.tags
    this.manifestPath = deployment.manifestPath
    this.path = deployment.path
    this.entrypoint = deployment.entrypoint
    this.storageDocumentId = deployment.storageDocumentId
    this.infrastructureDocumentId = deployment.infrastructureDocumentId
    this.workQueueName = deployment.workQueueName
  }

  public get deprecated(): boolean {
    return (this.manifestPath === '' || this.manifestPath === null) && (this.entrypoint === '' || this.entrypoint === null)
  }
}
