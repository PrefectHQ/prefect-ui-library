import { InjectionKey } from 'vue'
import { CreateFlowRun } from '@/models/CreateFlowRun'
import { Deployment } from '@/models/Deployment'
import { Flow } from '@/models/Flow'
import { IDeploymentResponse } from '@/models/IDeploymentResponse'
import { IFlowResponse } from '@/models/IFlowResponse'
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

  public createDeploymentFlowRun(deploymentId: string, body: CreateFlowRun): Promise<Flow> {
    const request = mapper.map('CreateFlowRun', body, 'CreateFlowRunRequest')

    return this.post<IFlowResponse>(`/${deploymentId}/create_flow_run`, request)
      .then(({ data }) => mapper.map('IFlowResponse', data, 'Flow'))
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
