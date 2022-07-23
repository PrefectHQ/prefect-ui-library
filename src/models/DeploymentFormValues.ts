import { Deployment, IDeploymentRequest, FlowData, Schedule, FlowRunner } from '@/models'

export class DeploymentFormValues {
  public id: string | null
  public name: string | null
  public flowId: string | null
  public flowData: FlowData | null
  public schedule: Schedule | null
  public isScheduleActive: boolean
  public parameters: Record<string, unknown> | null
  public tags: string[] | null
  public flowRunner: FlowRunner | null

  public constructor(deployment?: Partial<Deployment>) {
    this.id = deployment?.id ?? null
    this.name = deployment?.name ?? null
    this.flowId = deployment?.flowId ?? null
    this.flowData = deployment?.flowData ?? null
    this.schedule = deployment?.schedule ?? null
    this.isScheduleActive = deployment?.isScheduleActive ?? true
    this.parameters = deployment?.parameters ?? null
    this.tags = deployment?.tags ?? null
    this.flowRunner = deployment?.flowRunner ?? null
  }

  public getDeploymentRequest(): IDeploymentRequest {
    return {
      'name': this.name,
      'schedule': this.schedule?.toResponse(),
      'is_schedule_active': this.isScheduleActive,
      'parameters': this.parameters,
      'tags': this.tags,
    }
  }
}