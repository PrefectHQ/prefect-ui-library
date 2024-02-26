import { SchemaResponse } from '@/models/api/SchemaResponse'
import { CreatedOrUpdatedBy } from '@/models/CreatedOrUpdatedBy'
import { DeploymentSchedule } from '@/models/DeploymentSchedule'
import { DeploymentStatus } from '@/models/DeploymentStatus'
import { ObjectLevelCan } from '@/models/ObjectLevelCan'
import { Schedule } from '@/models/Schedule'
import { SchemaV2, SchemaValuesV2 } from '@/schemas'
import { Schema, SchemaValues } from '@/types/schemas'


export interface IDeployment {
  id: string,
  created: Date,
  createdBy: CreatedOrUpdatedBy | null,
  updated: Date,
  updatedBy: CreatedOrUpdatedBy | null,
  name: string,
  version: string,
  description: string | null,
  flowId: string,
  paused: boolean,
  schedules: DeploymentSchedule[],
  parameters: SchemaValues,
  parameterOpenApiSchema: Schema,
  parametersV2: SchemaValuesV2,
  parameterOpenApiSchemaV2: SchemaV2,
  tags: string[] | null,
  manifestPath: string | null,
  path: string | null,
  rawParameters: SchemaValues,
  rawSchema: SchemaResponse,
  entrypoint: string | null,
  storageDocumentId: string | null,
  infrastructureDocumentId: string | null,
  infrastructureOverrides: Record<string, unknown> | null,
  workQueueName: string | null,
  workPoolName: string | null,
  enforceParameterSchema: boolean,
  pullSteps: unknown,
  can: ObjectLevelCan<'deployment'>,
  status: DeploymentStatus,
}

export class Deployment implements IDeployment {
  public readonly id: string
  public created: Date
  public createdBy: CreatedOrUpdatedBy | null
  public updated: Date
  public updatedBy: CreatedOrUpdatedBy | null
  public name: string
  public version: string
  public description: string | null
  public readonly flowId: string
  public paused: boolean
  public schedules: DeploymentSchedule[]
  public parameters: SchemaValues
  public parameterOpenApiSchema: Schema
  public parametersV2: SchemaValuesV2
  public parameterOpenApiSchemaV2: SchemaV2
  public readonly rawParameters: SchemaValues
  public readonly rawSchema: SchemaResponse
  public tags: string[] | null
  public manifestPath: string | null
  public path: string | null
  public entrypoint: string | null
  public storageDocumentId: string | null
  public infrastructureDocumentId: string | null
  public infrastructureOverrides: Record<string, unknown> | null
  public workQueueName: string | null
  public workPoolName: string | null
  public enforceParameterSchema: boolean
  public pullSteps: unknown
  public can: ObjectLevelCan<'deployment'>
  public status: DeploymentStatus

  public constructor(deployment: IDeployment) {
    this.id = deployment.id
    this.created = deployment.created
    this.createdBy = deployment.createdBy
    this.updated = deployment.updated
    this.updatedBy = deployment.updatedBy
    this.name = deployment.name
    this.version = deployment.version
    this.description = deployment.description
    this.flowId = deployment.flowId
    this.paused = deployment.paused
    this.schedules = deployment.schedules
    this.parameters = deployment.parameters
    this.parameterOpenApiSchema = deployment.parameterOpenApiSchema
    this.parametersV2 = deployment.parametersV2
    this.parameterOpenApiSchemaV2 = deployment.parameterOpenApiSchemaV2
    this.tags = deployment.tags
    this.manifestPath = deployment.manifestPath
    this.rawParameters = deployment.rawParameters
    this.rawSchema = deployment.rawSchema
    this.path = deployment.path
    this.entrypoint = deployment.entrypoint
    this.storageDocumentId = deployment.storageDocumentId
    this.infrastructureDocumentId = deployment.infrastructureDocumentId
    this.infrastructureOverrides = deployment.infrastructureOverrides
    this.workQueueName = deployment.workQueueName
    this.workPoolName = deployment.workPoolName
    this.enforceParameterSchema = deployment.enforceParameterSchema
    this.pullSteps = deployment.pullSteps
    this.can = deployment.can
    this.status = deployment.status
  }

  public get deprecated(): boolean {
    return (this.manifestPath === '' || this.manifestPath === null) && (this.entrypoint === '' || this.entrypoint === null)
  }

  public get appliedBy(): string | null {
    if (this.updatedBy) {
      return this.updatedBy.displayValue
    }

    if (this.createdBy) {
      return this.createdBy.displayValue
    }

    return null
  }
}
