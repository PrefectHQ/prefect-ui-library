import { WorkPoolWorker, WorkPoolWorkerPaginationResponse, WorkPoolWorkerResponse, WorkPoolWorkersPagination } from '@/models'
import { WorkPoolWorkersFilterEndpoint, WorkPoolWorkersPaginationFilter } from '@/models/Filters'
import { mapper, WorkspaceApi } from '@/services'

export type WorkerDeleteArg = {
  workPoolName: string,
  workerName: string,
}

export class WorkspaceWorkPoolWorkersApi extends WorkspaceApi {
  protected override routePrefix = '/work_pools/'

  public async getWorkers(workPoolName: string, filter: WorkPoolWorkersFilterEndpoint = {}): Promise<WorkPoolWorker[]> {
    const request = mapper.map('WorkPoolWorkersFilterEndpoint', filter, 'WorkPoolWorkersFilterEndpointRequest')
    const encodedWorkPoolName = encodeURI(workPoolName)
    const { data } = await this.post<WorkPoolWorkerResponse[]>(`/${encodedWorkPoolName}/workers/filter`, request)

    return mapper.map('WorkPoolWorkerResponse', data, 'WorkPoolWorker')
  }

  public async getWorkersPaginated(workPoolName: string, filter: WorkPoolWorkersPaginationFilter = {}): Promise<WorkPoolWorkersPagination> {
    const request = mapper.map('WorkPoolWorkersPaginationFilter', filter, 'WorkPoolWorkersPaginationFilterRequest')
    const encodedWorkPoolName = encodeURI(workPoolName)
    const { data } = await this.post<WorkPoolWorkerPaginationResponse>(`/${encodedWorkPoolName}/workers/paginate`, request)

    return mapper.map('WorkPoolWorkersPaginationResponse', data, 'WorkPoolWorkersPagination')
  }

  public deleteWorker(arg: WorkerDeleteArg): Promise<void> {
    const encodedWorkPoolName = encodeURI(arg.workPoolName)
    const encodedWorkerName = encodeURI(arg.workerName)
    return this.delete(`/${encodedWorkPoolName}/workers/${encodedWorkerName}`)
  }
}