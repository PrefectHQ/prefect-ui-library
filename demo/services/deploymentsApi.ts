import { createActions } from '@prefecthq/vue-compositions'
import { MockedApi } from './MockedApi'
import { Deployment } from '@/models/Deployment'
import { mocker } from '@/services'

export class DeploymentsApi extends MockedApi {
  public getDeployment(id: string): Promise<Deployment> {
    return this.promise(mocker.create('deployment', [{ id: id }]))
  }

  public pauseDeployment(id: string): Promise<void> {
    return this.void()
  }

  public resumeDeployment(id: string): Promise<void> {
    return this.void()
  }
}

export const deploymentsApi = createActions(new DeploymentsApi())