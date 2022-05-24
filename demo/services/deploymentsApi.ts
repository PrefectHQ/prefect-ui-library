import { createActions } from '@prefecthq/vue-compositions'
import { MockedApi } from './MockedApi'
import { Deployment } from '@/models/Deployment'
import { mocker } from '@/services'

export class DeploymentsApi extends MockedApi {
  public getDeployment(id: string): Promise<Deployment> {
    return this.promise(mocker.create('deployment', [{ id: id }]))
  }

  public getDeployments(): Promise<Deployment[]> {
    return this.promise(mocker.createMany('deployment', mocker.create('number', [1, 100])))
  }
}

export const deploymentsApi = createActions(new DeploymentsApi())