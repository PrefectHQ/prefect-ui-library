import { MockApi } from './MockApi'
import { Deployment, DeploymentFlowRunCreate, DeploymentUpdate, FlowRun, UnionFilters } from '@/models'
import { IWorkspaceDeploymentsApi, mocker } from '@/services'

export class MockWorkspaceDeploymentsApi extends MockApi implements IWorkspaceDeploymentsApi {

  public async getDeployment(deploymentId: string): Promise<Deployment> {
    return await this.deployments.get(deploymentId)
  }

  public async getDeployments(filter: UnionFilters): Promise<Deployment[]> {
    if (Object.keys(filter).length) {
      console.warn('MockWorkspaceDeploymentsApi has not implemented the filter argument of the getDeployments method')
    }

    return await this.deployments.getAll()

  }

  public async getDeploymentsCount(filter: UnionFilters): Promise<number> {
    if (Object.keys(filter).length) {
      console.warn('MockWorkspaceDeploymentsApi has not implemented the filter argument of the getDeploymentsCount method')
    }

    return await this.deployments.count()
  }

  public async createDeploymentFlowRun(deploymentId: string, request?: DeploymentFlowRunCreate): Promise<FlowRun> {
    if (request) {
      console.warn('MockWorkspaceDeploymentsApi has not implemented the request argument of the createDeploymentFlowRun method')
    }

    const { flowId } = this.deployments.get(deploymentId)
    const flowRun = mocker.create('flowRun', [{ flowId, deploymentId }])
    this.flowRuns.create(flowRun)

    return await flowRun
  }

  public updateDeployment(deploymentId: string, request: DeploymentUpdate): Promise<void> {
    const deployment = this.deployments.get(deploymentId)

    this.deployments.patch(deploymentId, { ...deployment, ...request })

    return Promise.resolve()

  }

  public pauseDeployment(deploymentId: string): Promise<void> {
    const deployment = this.deployments.get(deploymentId)
    deployment.isScheduleActive = false

    this.deployments.patch(deploymentId, deployment)

    return Promise.resolve()
  }

  public resumeDeployment(deploymentId: string): Promise<void> {
    const deployment = this.deployments.get(deploymentId)
    deployment.isScheduleActive = true

    this.deployments.patch(deploymentId, deployment)

    return Promise.resolve()
  }

  public async deleteDeployment(deploymentId: string): Promise<void> {
    return await this.deployments.delete(deploymentId)
  }


}