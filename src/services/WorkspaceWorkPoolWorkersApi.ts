import { WorkPoolWorker } from '@/models'
import { WorkPoolWorkerResponse } from '@/models/api/WorkPoolWorkerResponse'
import { WorkPoolWorkersFilter } from '@/models/Filters'
import { mapper, WorkspaceApi } from '@/services'

export class WorkspaceWorkPoolWorkersApi extends WorkspaceApi {
  protected override routePrefix = '/work_pools/'

  public async getWorkers(workPoolName: string, filter: WorkPoolWorkersFilter = {}): Promise<WorkPoolWorker[]> {
    const request = mapper.map('WorkPoolWorkersFilter', filter, 'WorkPoolWorkersFilterRequest')
    const encodedWorkPoolName = encodeURI(workPoolName)
    const { data } = await this.post<WorkPoolWorkerResponse[]>(`/${encodedWorkPoolName}/workers/filter`, request)

    return mapper.map('WorkPoolWorkerResponse', data, 'WorkPoolWorker')
  }
}