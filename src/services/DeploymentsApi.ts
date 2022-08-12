import { InjectionKey } from 'vue'
import { DeploymentFlowRunCreate, DeploymentUpdate } from '@/models'
import { Deployment } from '@/models/Deployment'
import { DeploymentResponse } from '@/models/DeploymentResponse'
import { FlowRun } from '@/models/FlowRun'
import { FlowRunResponse } from '@/models/FlowRunResponse'
import { Api, ApiRoute } from '@/services/Api'
import { mapper } from '@/services/Mapper'
import { UnionFilters } from '@/types/UnionFilters'

export class DeploymentsApi extends Api {

  protected override route: ApiRoute = '/deployments'

  public getDeployment(deploymentId: string): Promise<Deployment> {
    return this.get<DeploymentResponse>(`/${deploymentId}`)
      .then(({ data }) => mapper.map('DeploymentResponse', data, 'Deployment'))
  }

  public getDeployments(filter: UnionFilters): Promise<Deployment[]> {
    return this.post<DeploymentResponse[]>('/filter', filter)
      .then(({ data }) => mapper.map('DeploymentResponse', data, 'Deployment'))
  }

  public getDeploymentsCount(filter: UnionFilters): Promise<number> {
    return this.post<number>('/count', filter).then(({ data }) => data)
  }

  public createDeploymentFlowRun(deployment: Deployment, request: DeploymentFlowRunCreate): Promise<FlowRun> {
    const body = mapper.map('DeploymentFlowRunCreate', { request, schema: deployment.parameterOpenApiSchema }, 'DeploymentFlowRunRequest')

    return this.post<FlowRunResponse>(`/${deployment.id}/create_flow_run`, body)
      .then(({ data }) => mapper.map('FlowRunResponse', data, 'FlowRun'))
  }

  public updateDeployment(deployment: Deployment, request: DeploymentUpdate): Promise<void> {
    const body = mapper.map('DeploymentUpdate', { request, schema: deployment.parameterOpenApiSchema }, 'DeploymentUpdateRequest')

    return this.patch(`/${deployment.id}`, body)
  }

  public pauseDeployment(id: string): Promise<void> {
    return this.post(`/${id}/set_schedule_inactive`)
  }

  public resumeDeployment(id: string): Promise<void> {
    return this.post(`/${id}/set_schedule_active`)
  }

  public deleteDeployment(deploymentId: string): Promise<void> {
    return this.delete(`/${deploymentId}`)
  }
}

export const deploymentsApiKey: InjectionKey<DeploymentsApi> = Symbol('deploymentsApiKey')
