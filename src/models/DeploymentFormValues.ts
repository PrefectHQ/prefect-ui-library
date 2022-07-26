import { Deployment, IDeploymentRequest, Schedule } from '@/models'

export class DeploymentFormValues {
  public schedule: Schedule | null
  public isScheduleActive: boolean
  public parameters: Record<string, unknown> | null
  public tags: string[] | null

  public constructor(deployment?: Partial<Deployment>) {
    this.schedule = deployment?.schedule ?? null
    this.isScheduleActive = deployment?.isScheduleActive ?? true
    this.parameters = deployment?.parameters ?? null
    this.tags = deployment?.tags ?? null
  }

  public getDeploymentRequest(): IDeploymentRequest {
    return {
      'schedule': this.schedule?.toResponse(),
      'is_schedule_active': this.isScheduleActive,
      'parameters': this.parameters,
      'tags': this.tags,
    }
  }
}