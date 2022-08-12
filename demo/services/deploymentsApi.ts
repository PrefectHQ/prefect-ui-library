import { createActions } from '@prefecthq/vue-compositions'
import { MockedApi } from './MockedApi'
import { FlowRun, DeploymentFlowRunCreate } from '@/models'
import { Deployment } from '@/models/Deployment'
import { mapper, mocker } from '@/services'
import { UnionFilters } from '@/types/UnionFilters'

export class DeploymentsApi extends MockedApi {
  public getDeployment(id: string): Promise<Deployment> {
    return this.promise(mocker.create('deployment', [{ id: id }]))
  }

  public getDeployments(filter: UnionFilters): Promise<Deployment[]> {
    return this.promise(mocker.createMany('deployment', mocker.create('number', [1, 100])))
  }

  public createDeploymentFlowRun(deploymentId: string, request: DeploymentFlowRunCreate): Promise<FlowRun> {
    const body = mapper.map('DeploymentFlowRunCreate', request, 'DeploymentFlowRunRequest')

    const filteredRequest = Object.entries(body).reduce((req: Record<string, unknown>, [currKey, currVal]) => {
      if (typeof currVal !== 'undefined') {
        req[currKey] = currVal
      }

      return req
    }, {}) as Partial<FlowRun>

    return this.promise(mocker.create('flowRun', [{ deploymentId, ...filteredRequest }]))
  }

  public pauseDeployment(id: string): Promise<void> {
    return this.void()
  }

  public resumeDeployment(id: string): Promise<void> {
    return this.void()
  }

  public deleteDeployment(id: string): Promise<void> {
    return this.void()
  }
}

export const deploymentsApi = createActions(new DeploymentsApi())