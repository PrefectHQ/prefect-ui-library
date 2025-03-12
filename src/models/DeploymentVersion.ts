import { ConcurrencyV2Limit } from '@/models/ConcurrencyV2Limit'
import { CreatedOrUpdatedBy } from '@/models/CreatedOrUpdatedBy'
import { DeploymentConcurrencyOptions, IDeployment } from '@/models/Deployment'
import { DeploymentStatus } from '@/models/DeploymentStatus'
import { DeploymentVersionInfo } from '@/models/DeploymentVersionInfo'
import { ObjectLevelCan } from '@/models/ObjectLevelCan'
import { SchemaValuesV2, SchemaV2 } from '@/schemas'

export type IDeploymentVersion = Omit<IDeployment, 'versionId' | 'version' | 'schedules'> & {
  deploymentId: string,
  versionInfo: DeploymentVersionInfo,
}

export class DeploymentVersion implements IDeploymentVersion {
  public readonly id: string
  public readonly deploymentId: string
  public readonly kind = 'deployment-version'
  public created: Date
  public createdBy: CreatedOrUpdatedBy | null
  public updated: Date
  public updatedBy: CreatedOrUpdatedBy | null
  public name: string
  public versionInfo: DeploymentVersionInfo
  public description: string | null
  public readonly flowId: string
  public paused: boolean
  public parameters: SchemaValuesV2
  public parameterOpenApiSchema: SchemaV2
  public tags: string[] | null
  public manifestPath: string | null
  public path: string | null
  public entrypoint: string | null
  public storageDocumentId: string | null
  public infrastructureDocumentId: string | null
  public jobVariables: Record<string, unknown> | null
  public workQueueName: string | null
  public workPoolName: string | null
  public enforceParameterSchema: boolean
  public pullSteps: unknown
  public can: ObjectLevelCan<'deployment'>
  public status: DeploymentStatus
  public disabled: boolean
  public globalConcurrencyLimit: ConcurrencyV2Limit | null
  public concurrencyOptions: DeploymentConcurrencyOptions | null

  public constructor(deploymentVersion: IDeploymentVersion) {
    this.id = deploymentVersion.id
    this.deploymentId = deploymentVersion.deploymentId
    this.versionInfo = deploymentVersion.versionInfo
    this.created = deploymentVersion.created
    this.createdBy = deploymentVersion.createdBy
    this.updated = deploymentVersion.updated
    this.updatedBy = deploymentVersion.updatedBy
    this.name = deploymentVersion.name
    this.description = deploymentVersion.description
    this.flowId = deploymentVersion.flowId
    this.paused = deploymentVersion.paused
    this.parameters = deploymentVersion.parameters
    this.parameterOpenApiSchema = deploymentVersion.parameterOpenApiSchema
    this.tags = deploymentVersion.tags
    this.manifestPath = deploymentVersion.manifestPath
    this.path = deploymentVersion.path
    this.entrypoint = deploymentVersion.entrypoint
    this.storageDocumentId = deploymentVersion.storageDocumentId
    this.infrastructureDocumentId = deploymentVersion.infrastructureDocumentId
    this.jobVariables = deploymentVersion.jobVariables
    this.workQueueName = deploymentVersion.workQueueName
    this.workPoolName = deploymentVersion.workPoolName
    this.enforceParameterSchema = deploymentVersion.enforceParameterSchema
    this.pullSteps = deploymentVersion.pullSteps
    this.can = deploymentVersion.can
    this.status = deploymentVersion.status
    this.disabled = deploymentVersion.disabled
    this.globalConcurrencyLimit = deploymentVersion.globalConcurrencyLimit
    this.concurrencyOptions = deploymentVersion.concurrencyOptions
  }
}