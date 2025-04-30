import { CreatedOrUpdatedBy } from '@/models/CreatedOrUpdatedBy'
import { DeploymentVersionInfo } from '@/models/DeploymentVersionInfo'
import { SchemaValuesV2, SchemaV2 } from '@/schemas'

export type IDeploymentVersion = {
  id: string,
  created: Date,
  createdBy: CreatedOrUpdatedBy | null,
  updated: Date,
  updatedBy: CreatedOrUpdatedBy | null,
  lastActive: Date | null,
  name: string,
  deploymentId: string,
  description: string | null,
  versionInfo: DeploymentVersionInfo,
  tags: string[] | null,
  labels: Record<string, string>,
  entrypoint: string | null,
  pullSteps: unknown,
  parameters: SchemaValuesV2,
  parameterOpenApiSchema: SchemaV2,
  jobVariables: Record<string, unknown> | null,
  workQueueName: string | null,
  workPoolName: string | null,
  enforceParameterSchema: boolean,
}

export class DeploymentVersion implements IDeploymentVersion {
  public readonly id: string
  public readonly deploymentId: string
  public readonly kind = 'deployment-version'
  public readonly created: Date
  public readonly createdBy: CreatedOrUpdatedBy | null
  public readonly updated: Date
  public readonly updatedBy: CreatedOrUpdatedBy | null
  public readonly lastActive: Date | null
  public readonly name: string
  public readonly description: string | null
  public readonly versionInfo: DeploymentVersionInfo
  public readonly tags: string[]
  public readonly labels: Record<string, string>
  public readonly entrypoint: string | null
  public readonly pullSteps: unknown
  public readonly parameters: SchemaValuesV2
  public readonly parameterOpenApiSchema: SchemaV2
  public readonly jobVariables: Record<string, unknown> | null
  public readonly workQueueName: string | null
  public readonly workPoolName: string | null
  public readonly enforceParameterSchema: boolean

  public constructor(deploymentVersion: IDeploymentVersion) {
    this.id = deploymentVersion.id
    this.deploymentId = deploymentVersion.deploymentId
    this.created = deploymentVersion.created
    this.createdBy = deploymentVersion.createdBy
    this.updated = deploymentVersion.updated
    this.updatedBy = deploymentVersion.updatedBy
    this.lastActive = deploymentVersion.lastActive
    this.name = deploymentVersion.name
    this.description = deploymentVersion.description
    this.versionInfo = deploymentVersion.versionInfo
    this.tags = deploymentVersion.tags ?? []
    this.labels = deploymentVersion.labels
    this.entrypoint = deploymentVersion.entrypoint
    this.pullSteps = deploymentVersion.pullSteps
    this.parameters = deploymentVersion.parameters
    this.parameterOpenApiSchema = deploymentVersion.parameterOpenApiSchema
    this.jobVariables = deploymentVersion.jobVariables
    this.workQueueName = deploymentVersion.workQueueName
    this.workPoolName = deploymentVersion.workPoolName
    this.enforceParameterSchema = deploymentVersion.enforceParameterSchema
  }
}