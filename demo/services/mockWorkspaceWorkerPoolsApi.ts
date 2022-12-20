
import { MockApi } from '@/../demo/services/MockApi'
import { WorkerFlowRun, WorkerFlowRuns, WorkerPool, WorkerPoolCreate, WorkerPoolEdit, WorkerPoolFilter } from '@/models'
import { IWorkspaceWorkerPoolsApi, mocker } from '@/services'

export class MockWorkspaceWorkerPoolsApi extends MockApi implements IWorkspaceWorkerPoolsApi {

  public async createWorkerPool(request: WorkerPoolCreate): Promise<WorkerPool> {
    const workerPool = mocker.create('workerPool', [request])
    this.workerPools.create(workerPool)
    return await workerPool
  }

  public async getWorkerPoolByName(workerPoolName: string): Promise<WorkerPool> {
    return await this.workerPools.find(workerPool => workerPool.name === workerPoolName)!
  }

  public async getWorkerPools(filter: WorkerPoolFilter): Promise<WorkerPool[]> {
    if (Object.keys(filter).length) {
      console.warn('MockWorkspaceWorkerPoolsApi has not implemented the filter argument of the getWorkerPools method')
    }

    return await this.workerPools.getAll()
  }

  public async updateWorkerPool(workerPoolName: string, request: WorkerPoolEdit): Promise<void> {
    return await this.workerPools.patch(workerPoolName, request)
  }

  public async deleteWorkerPool(workerPoolName: string): Promise<void> {
    return await this.workerPools.delete(workerPoolName)
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  public async getWorkerPoolRuns(workerPoolName: string, request: WorkerFlowRuns): Promise<WorkerFlowRun[]> {
    const workerPool = this.workerPools.get(workerPoolName)
    const flowRun = mocker.create('flowRun')

    const data = {
      workerPoolId: workerPool.id,
      workerPoolQueueId: workerPool.defaultQueueId,
      flowRun: flowRun,
    }
    return await [data]
  }
}

