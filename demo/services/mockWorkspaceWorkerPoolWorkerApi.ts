import { MockApi } from './MockApi'
import { WorkerPoolWorker, WorkerPoolWorkerFilter } from '@/models'
import { IWorkspaceWorkerPoolWorkersApi } from '@/services'
export class MockWorkspaceWorkerPoolWorkerApi extends MockApi implements IWorkspaceWorkerPoolWorkersApi {

  public async getWorkers(workerPoolName: string, filter: WorkerPoolWorkerFilter = {}): Promise<WorkerPoolWorker[]> {
    if (Object.keys(filter).length) {
      console.warn('MockWorkspaceWorkerPoolWorkerApi has not implemented the filter argument of the getWorkers method')
    }

    const workerPool = this.workerPools.find(workerPool => workerPool.name === workerPoolName)!
    const workerPoolWorkers = this.workerPoolWorkers.findAll(worker => worker.workerPoolId === workerPool.id)!

    return await workerPoolWorkers
  }
}