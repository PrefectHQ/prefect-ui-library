import { Deployment, IDeploymentRequest, Schedule } from '@/models'

export class DeploymentFormValues {
  public id: string | null
  public description: string | null
  public name: string | null
  public flowId: string | null
  public schedule: Schedule | null
  public isScheduleActive: boolean
  public parameters: Record<string, unknown> | null
  public tags: string[] | null

  public constructor(deployment?: Partial<Deployment>) {
    this.id = deployment?.id ?? null
    this.name = deployment?.name ?? null
    this.description = deployment?.description ?? null
    this.flowId = deployment?.flowId ?? null
    this.schedule = deployment?.schedule ?? null
    this.isScheduleActive = deployment?.isScheduleActive ?? true
    this.parameters = deployment?.parameters ?? null
    this.tags = deployment?.tags ?? null
  }

  public getDeploymentRequest(): IDeploymentRequest {
    return {
      'name': this.name,
      'description': this.description,
      'flow_id': this.flowId,
      'schedule': this.schedule?.toResponse(),
      'is_schedule_active': this.isScheduleActive,
      'parameters': this.parameters,
      'tags': this.tags,
    }
  }
}