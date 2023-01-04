import { MockApi } from './MockApi'
import { WorkPoolWorker, WorkPoolWorkerFilter } from '@/models'
import { IWorkspaceWorkPoolWorkersApi } from '@/services'
export class MockWorkspaceWorkPoolWorkerApi extends MockApi implements IWorkspaceWorkPoolWorkersApi {

  public async getWorkers(workPoolName: string, filter: WorkPoolWorkerFilter = {}): Promise<WorkPoolWorker[]> {
    if (Object.keys(filter).length) {
      console.warn('MockWorkspaceWorkPoolWorkerApi has not implemented the filter argument of the getWorkers method')
    }

    const workPool = this.workPools.find(workPool => workPool.name === workPoolName)!
    const workPoolWorkers = this.workPoolWorkers.findAll(worker => worker.workPoolId === workPool.id)!

    return await workPoolWorkers
  }
}