import { InjectionKey } from 'vue'
import { IDeploymentFlowRunRequest, IDeploymentRequest } from '@/models'
import { Deployment } from '@/models/Deployment'
import { FlowRun } from '@/models/FlowRun'
import { IDeploymentResponse } from '@/models/IDeploymentResponse'
import { IFlowRunResponse } from '@/models/IFlowRunResponse'
import { Api, ApiRoute } from '@/services/Api'
import { mapper } from '@/services/Mapper'
import { UnionFilters } from '@/types/UnionFilters'

export class DeploymentsApi extends Api {

  protected override route: ApiRoute = '/deployments'

  public getDeployment(deploymentId: string): Promise<Deployment> {
    return this.get<IDeploymentResponse>(`/${deploymentId}`)
      .then(({ data }) => mapper.map('IDeploymentResponse', data, 'Deployment'))
  }

  public getDeployments(filter: UnionFilters): Promise<Deployment[]> {
    return this.post<IDeploymentResponse[]>('/filter', filter)
      .then(({ data }) => mapper.map('IDeploymentResponse', data, 'Deployment'))
  }

  public getDeploymentsCount(filter: UnionFilters): Promise<number> {
    return this.post<number>('/count', filter).then(({ data }) => data)
  }

  public createDeploymentFlowRun(deploymentId: string, body: IDeploymentFlowRunRequest): Promise<FlowRun> {
    return this.post<IFlowRunResponse>(`/${deploymentId}/create_flow_run`, body)
      .then(({ data }) => mapper.map('IFlowRunResponse', data, 'FlowRun'))
  }

  public updateDeployment(deploymentId: string, request: IDeploymentRequest): Promise<void> {
    return this.patch(`/${deploymentId}`, request)
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
