import { DeploymentScheduleUpdate } from '@/models/DeploymentScheduleUpdate'
import { mapper } from '@/services/Mapper'
import { WorkspaceApi } from '@/services/WorkspaceApi'

export class WorkspaceDeploymentScheduleApi extends WorkspaceApi {

  protected override routePrefix = '/deployments'

  public updateDeploymentSchedule(deploymentId: string, scheduleId: string, request: DeploymentScheduleUpdate): Promise<void> {
    const body = mapper.map('DeploymentScheduleUpdate', request, 'DeploymentScheduleUpdateRequest')

    return this.patch(`/${deploymentId}/schedules/${scheduleId}`, body)
  }

  public deleteDeploymentSchedule(deploymentId: string, scheduleId: string): Promise<void> {
    return this.delete(`/${deploymentId}/schedules/${scheduleId}`)
  }
}
