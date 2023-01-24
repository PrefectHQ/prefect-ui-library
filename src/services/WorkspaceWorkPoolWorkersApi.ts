import { WorkPoolWorker } from '@/models'
import { WorkPoolWorkerResponse } from '@/models/api/WorkPoolWorkerResponse'
import { WorkPoolWorkersFilter } from '@/models/Filters'
import { mapper, WorkspaceApi } from '@/services'

export interface IWorkspaceWorkPoolWorkersApi {
  getWorkers: (workPoolName: string, filter: WorkPoolWorkersFilter) => Promise<WorkPoolWorker[]>,
}

export class WorkspaceWorkPoolWorkersApi extends WorkspaceApi implements IWorkspaceWorkPoolWorkersApi {
  protected override routePrefix = '/experimental/work_pools/'

  public async getWorkers(workPoolName: string, filter: WorkPoolWorkersFilter = {}): Promise<WorkPoolWorker[]> {
    const request = mapper.map('WorkPoolWorkersFilter', filter, 'WorkPoolWorkersFilterRequest')
    const { data } = await this.post<WorkPoolWorkerResponse[]>(`/${workPoolName}/workers/filter`, request)

    return mapper.map('WorkPoolWorkerResponse', data, 'WorkPoolWorker')
  }
}