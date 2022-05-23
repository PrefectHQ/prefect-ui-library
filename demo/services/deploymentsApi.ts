import { createActions } from '@prefecthq/vue-compositions'
import { MockedApi } from './MockedApi'
import { Deployment } from '@/models/Deployment'
import { mocker } from '@/services'

export class DeploymentsApi extends MockedApi {
  public getDeployment(id: string): Promise<Deployment> {
    return this.promise(mocker.create('deployment', [{ id: id }]))
  }

  public pauseDeployment(id: string): Promise<void> {
    return new Promise<void>(resolve => resolve())
  }

  public resumeDeployment(id: string): Promise<void> {
    return new Promise<void>(resolve => resolve())
  }
}

export const deploymentsApi = createActions(new DeploymentsApi())