import { Schedule } from '@/models/Schedule'
import { PydanticTypeDefinition } from '@/types/Pydantic'

export interface IDeployment {
  id: string,
  created: Date,
  updated: Date,
  name: string,
  description: string | null,
  flowId: string,
  schedule: Schedule | null,
  isScheduleActive: boolean,
  parameters: Record<string, unknown>,
  parameterOpenApiSchema: PydanticTypeDefinition,
  tags: string[] | null,
  manifestPath: string | null,
  storageDocumentId: string | null,
  infrastructureDocumentId: string | null,
}

export class Deployment implements IDeployment {
  public readonly id: string
  public created: Date
  public updated: Date
  public name: string
  public description: string | null
  public readonly flowId: string
  public schedule: Schedule | null
  public isScheduleActive: boolean
  public parameters: Record<string, unknown>
  public parameterOpenApiSchema: PydanticTypeDefinition
  public tags: string[] | null
  public manifestPath: string | null
  public storageDocumentId: string | null
  public infrastructureDocumentId: string | null

  public constructor(deployment: IDeployment) {
    this.id = deployment.id
    this.created = deployment.created
    this.updated = deployment.updated
    this.name = deployment.name
    this.description = deployment.description
    this.flowId = deployment.flowId
    this.schedule = deployment.schedule
    this.isScheduleActive = deployment.isScheduleActive
    this.parameters = deployment.parameters
    this.parameterOpenApiSchema = deployment.parameterOpenApiSchema
    this.tags = deployment.tags
    this.manifestPath = deployment.manifestPath
    this.storageDocumentId = deployment.storageDocumentId
    this.infrastructureDocumentId = deployment.infrastructureDocumentId
  }

  public get deprecated(): boolean {
    return this.manifestPath === '' || this.manifestPath === null
  }
}