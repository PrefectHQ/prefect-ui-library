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

// TODO: deduplicate this from nebula-ui
// export const deploymentAccessLevels = ['Manage', 'Run', 'View'] as const
type DeploymentAccessLevel = 'Manage' | 'Run' | 'View'

export type DeploymentObjectLevelScopes = Lowercase<DeploymentAccessLevel>[]

export type DeploymentObjectLevelScopesMap = Record<string, DeploymentObjectLevelScopes>

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

  public async getDeploymentObjectLevelScopes(deploymentId: string): Promise<DeploymentObjectLevelScopes> {
    const deploymentAccesses = await this.getDeploymentsObjectLevelScopes([deploymentId])

    return deploymentAccesses[deploymentId]
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, require-await, no-unused-vars
  public async getDeploymentsObjectLevelScopes(deploymentIds: string[]): Promise<DeploymentObjectLevelScopesMap> {
    // a filtered out deployment means fallback to wildcard access thus we return an empty object
    return Promise.resolve({})
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
