import type { Schedule } from '@/models/Schedule'
import type { SchemaValuesV2 } from '@/schemas'

export interface IDeploymentSchedule {
  id: string,
  created: Date,
  updated: Date,
  slug: string | null,
  active: boolean,
  schedule: Schedule,
  jobVariables: Record<string, unknown>,
  parameters: SchemaValuesV2 | null,
}

export class DeploymentSchedule implements IDeploymentSchedule {
  public readonly id: string
  public created: Date
  public updated: Date
  public slug: string | null
  public active: boolean
  public schedule: Schedule
  public jobVariables: Record<string, unknown>
  public parameters: SchemaValuesV2 | null

  public constructor(deploymentSchedule: IDeploymentSchedule) {
    this.id = deploymentSchedule.id
    this.created = deploymentSchedule.created
    this.updated = deploymentSchedule.updated
    this.slug = deploymentSchedule.slug
    this.active = deploymentSchedule.active
    this.schedule = deploymentSchedule.schedule
    this.jobVariables = deploymentSchedule.jobVariables
    this.parameters = deploymentSchedule.parameters
  }

}