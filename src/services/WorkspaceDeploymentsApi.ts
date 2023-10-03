import { DeploymentResponse } from '@/models/api/DeploymentResponse'
import { FlowRunResponse } from '@/models/api/FlowRunResponse'
import { Deployment } from '@/models/Deployment'
import { DeploymentFlowRunCreate } from '@/models/DeploymentFlowRunCreate'
import { DeploymentUpdate } from '@/models/DeploymentUpdate'
import { DeploymentsFilter } from '@/models/Filters'
import { FlowRun } from '@/models/FlowRun'
import { BatchProcessor } from '@/services/BatchProcessor'
import { mapper } from '@/services/Mapper'
import { WorkspaceApi } from '@/services/WorkspaceApi'
import { toMap } from '@/utilities/arrays'

export interface IWorkspaceDeploymentsApi {
  getDeployment: (deploymentId: string) => Promise<Deployment>,
  getDeployments: (filter: DeploymentsFilter) => Promise<Deployment[]>,
  getDeploymentsCount: (filter: DeploymentsFilter) => Promise<number>,
  createDeploymentFlowRun: (deploymentId: string, request: DeploymentFlowRunCreate) => Promise<FlowRun>,
  updateDeployment: (deploymentId: string, request: DeploymentUpdate) => Promise<void>,
  pauseDeployment: (deploymentId: string) => Promise<void>,
  resumeDeployment: (deploymentId: string) => Promise<void>,
  deleteDeployment: (deploymentId: string) => Promise<void>,
}

type DeploymentAccess = {
  view: boolean,
  manage: boolean,
  run: boolean,
}

type DeploymentsAccess = Record<string, DeploymentAccess>

export class WorkspaceDeploymentsApi extends WorkspaceApi implements IWorkspaceDeploymentsApi {

  protected override routePrefix = '/deployments'

  private readonly batcher = new BatchProcessor<string, Deployment>(async ids => {
    const deployments = await this.getDeployments({
      deployments: {
        id: ids,
      },
    })

    return toMap(deployments, 'id')
  }, { maxBatchSize: 200 })

  public getDeployment(deploymentId: string): Promise<Deployment> {
    return this.batcher.batch(deploymentId)
  }

  public async getDeployments(filter: DeploymentsFilter = {}): Promise<Deployment[]> {
    const request = mapper.map('DeploymentsFilter', filter, 'DeploymentsFilterRequest')
    const { data } = await this.post<DeploymentResponse[]>('/filter', request)

    return mapper.map('DeploymentResponse', data, 'Deployment')
  }

  public async getDeploymentsCount(filter: DeploymentsFilter = {}): Promise<number> {
    const request = mapper.map('DeploymentsFilter', filter, 'DeploymentsFilterRequest')
    const { data } = await this.post<number>('/count', request)

    return data
  }

  public async getDeploymentAccess(deploymentId: string): Promise<DeploymentAccess> {
    const { data } = await this.post<DeploymentAccess>(`/${deploymentId}/my-access`)

    return data
  }

  public async getDeploymentsAccess(deploymentIds: string[]): Promise<DeploymentsAccess> {
    const { data } = await this.post<DeploymentsAccess>('/my-access', {
      deployments: deploymentIds,
    })

    return data
  }

  public async createDeploymentFlowRun(deploymentId: string, request: DeploymentFlowRunCreate): Promise<FlowRun> {
    const body = mapper.map('DeploymentFlowRunCreate', request, 'DeploymentFlowRunRequest')
    const { data } = await this.post<FlowRunResponse>(`/${deploymentId}/create_flow_run`, body)

    return mapper.map('FlowRunResponse', data, 'FlowRun')
  }

  public updateDeployment(deploymentId: string, request: DeploymentUpdate): Promise<void> {
    const body = mapper.map('DeploymentUpdate', request, 'DeploymentUpdateRequest')

    return this.patch(`/${deploymentId}`, body)
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
