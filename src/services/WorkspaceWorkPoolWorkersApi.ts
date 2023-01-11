import { WorkPoolWorker, WorkPoolWorkerFilter } from '@/models'
import { WorkPoolWorkerResponse } from '@/models/api/WorkPoolWorkerResponse'
import { mapper, WorkspaceApi } from '@/services'

export interface IWorkspaceWorkPoolWorkersApi {
  getWorkers: (workPoolName: string, filter: WorkPoolWorkerFilter) => Promise<WorkPoolWorker[]>,
}

export class WorkspaceWorkPoolWorkersApi extends WorkspaceApi implements IWorkspaceWorkPoolWorkersApi {
  protected override routePrefix = '/experimental/work_pools/'

  public async getWorkers(workPoolName: string, filter: WorkPoolWorkerFilter = {}): Promise<WorkPoolWorker[]> {
    const { data } = await this.post<WorkPoolWorkerResponse[]>(`/${workPoolName}/workers/filter`, filter)

    return mapper.map('WorkPoolWorkerResponse', data, 'WorkPoolWorker')
  }
}