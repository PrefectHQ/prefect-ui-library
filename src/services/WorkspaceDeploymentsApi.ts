import { DeploymentResponse } from '@/models/api/DeploymentResponse'
import { FlowRunResponse } from '@/models/api/FlowRunResponse'
import { Deployment } from '@/models/Deployment'
import { DeploymentFlowRunCreate, DeploymentFlowRunCreateV2 } from '@/models/DeploymentFlowRunCreate'
import { DeploymentUpdate, DeploymentUpdateV2 } from '@/models/DeploymentUpdate'
import { DeploymentsFilter } from '@/models/Filters'
import { FlowRun } from '@/models/FlowRun'
import { BatchProcessor } from '@/services/BatchProcessor'
import { mapper } from '@/services/Mapper'
import { WorkspaceApi } from '@/services/WorkspaceApi'
import { toMap } from '@/utilities/arrays'

export class WorkspaceDeploymentsApi extends WorkspaceApi {

  protected override routePrefix = '/deployments'

  private readonly batcher = new BatchProcessor<string, Deployment>(async ids => {
    if (ids.length === 1) {
      const [id] = ids
      return this.getSingleDeployment.bind(this, id)
    }

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

  protected async getSingleDeployment(deploymentId: string): Promise<Deployment> {
    const { data } = await this.get<DeploymentResponse>(`/${deploymentId}`)

    return mapper.map('DeploymentResponse', data, 'Deployment')
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

  /**
   * @deprecated Use createDeploymentFlowRunV2
   */
  public async createDeploymentFlowRun(deploymentId: string, request: DeploymentFlowRunCreate): Promise<FlowRun> {
    const body = mapper.map('DeploymentFlowRunCreate', request, 'DeploymentFlowRunRequest')
    const { data } = await this.post<FlowRunResponse>(`/${deploymentId}/create_flow_run`, body)

    return mapper.map('FlowRunResponse', data, 'FlowRun')
  }

  public async createDeploymentFlowRunV2(deploymentId: string, request: DeploymentFlowRunCreateV2): Promise<FlowRun> {
    const body = mapper.map('DeploymentFlowRunCreateV2', request, 'DeploymentFlowRunRequest')
    const { data } = await this.post<FlowRunResponse>(`/${deploymentId}/create_flow_run`, body)

    return mapper.map('FlowRunResponse', data, 'FlowRun')
  }

  /**
   * @deprecated Use updateDeploymentV2
   */
  public updateDeployment(deploymentId: string, request: DeploymentUpdate): Promise<void> {
    const body = mapper.map('DeploymentUpdate', request, 'DeploymentUpdateRequest')

    return this.patch(`/${deploymentId}`, body)
  }

  public updateDeploymentV2(deploymentId: string, request: DeploymentUpdateV2): Promise<void> {
    const body = mapper.map('DeploymentUpdateV2', request, 'DeploymentUpdateRequest')

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
