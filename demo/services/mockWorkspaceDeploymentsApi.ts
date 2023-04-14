import { KeyedDataStoreFindCallback } from './KeyedDataStore'
import { MockApi } from './MockApi'
import { Deployment, DeploymentFlowRunCreate, DeploymentUpdate, FlowRun } from '@/models'
import { DeploymentsFilter } from '@/models/Filters'
import { IWorkspaceDeploymentsApi, mocker } from '@/services'

const deploymentsItemIntersectsFilter = (filter: DeploymentsFilter): KeyedDataStoreFindCallback<Deployment> => {
  return (deployment: Deployment): boolean => {
    let filtered = false

    if (filter.flows?.id?.length) {
      filtered = !!deployment.flowId && !filter.flows.id.includes(deployment.flowId)
    }

    if (!filtered && filter.deployments?.id?.length) {
      filtered = !filter.deployments.id.includes(deployment.id)
    }

    if (!filtered && filter.deployments?.name?.length) {
      filtered = !filter.deployments.name.includes(deployment.name)
    }

    if (!filtered && filter.deployments?.nameLike?.length) {
      filtered = !deployment.name.includes(filter.deployments.nameLike)
    }

    return !filtered
  }
}

export class MockWorkspaceDeploymentsApi extends MockApi implements IWorkspaceDeploymentsApi {

  public async getDeployment(deploymentId: string): Promise<Deployment> {
    return await this.deployments.get(deploymentId)
  }

  /**
   * WARNING: Not all filter arguments have been implemented for the getDeployments method... feel free to add any missing filters :)
   */
  public async getDeployments(filter: DeploymentsFilter): Promise<Deployment[]> {
    const { limit = 200, offset = 0, sort = 'CREATED_DESC' } = filter
    let deployments = await this.deployments.findAll(deploymentsItemIntersectsFilter(filter))

    switch (sort) {
      /* eslint-disable id-length */
      case 'CREATED_DESC':
        deployments = deployments.sort((a, b) => b.created.getTime() - a.created.getTime())
        break
      case 'NAME_ASC':
        deployments = deployments.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'NAME_DESC':
        deployments = deployments.sort((a, b) => b.name.localeCompare(a.name))
        break
      default:
        console.warn(`MockWorkspaceDeploymentsApi has not implemented the sort argument for ${sort} of the getDeployments method`)
        break
      /* eslint-enable id-length */
    }

    console.log('getDeployments')

    deployments = deployments.slice(offset, offset + limit)
    return deployments
  }

  /**
   * WARNING: Not all filter arguments have been implemented for the getDeploymentsCount method... feel free to add any missing filters :)
   */
  public async getDeploymentsCount(filter: DeploymentsFilter): Promise<number> {
    return await this.deployments.count(deploymentsItemIntersectsFilter(filter))
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