import { PaginatedWorkPoolWorkers, WorkPoolWorker, WorkPoolWorkerPaginationResponse, WorkPoolWorkerResponse, WorkPoolWorkersPagination } from '@/models'
import { WorkPoolWorkersFilter } from '@/models/Filters'
import { mapper, WorkspaceApi } from '@/services'

export type WorkerDeleteArg = {
  workPoolName: string,
  workerName: string,
}

export class WorkspaceWorkPoolWorkersApi extends WorkspaceApi {
  protected override routePrefix = '/work_pools/'

  public async getWorkers(workPoolName: string, filter: WorkPoolWorkersFilter = {}): Promise<WorkPoolWorker[]> {
    const request = mapper.map('WorkPoolWorkersFilter', filter, 'WorkPoolWorkersFilterRequest')
    const encodedWorkPoolName = encodeURI(workPoolName)
    const { data } = await this.post<WorkPoolWorkerResponse[]>(`/${encodedWorkPoolName}/workers/filter`, request)

    return mapper.map('WorkPoolWorkerResponse', data, 'WorkPoolWorker')
  }

  public async getWorkersPaginated(workPoolName: string, filter: WorkPoolWorkersPagination = {}): Promise<PaginatedWorkPoolWorkers> {
    const request = mapper.map('WorkPoolWorkersPagination', filter, 'WorkPoolWorkersPaginationRequest')
    const encodedWorkPoolName = encodeURI(workPoolName)
    const { data } = await this.post<WorkPoolWorkerPaginationResponse>(`/${encodedWorkPoolName}/workers/paginate`, request)

    return mapper.map('WorkPoolWorkersPaginationResponse', data, 'PaginatedWorkPoolWorkers')
  }

  public async getWorker(workPoolName: string, workerId: string): Promise<WorkPoolWorker> {
    const encodedWorkPoolName = encodeURI(workPoolName)
    const { data } = await this.get<WorkPoolWorkerResponse>(`/${encodedWorkPoolName}/workers/${workerId}`)

    return mapper.map('WorkPoolWorkerResponse', data, 'WorkPoolWorker')
  }

  public deleteWorker(arg: WorkerDeleteArg): Promise<void> {
    const encodedWorkPoolName = encodeURI(arg.workPoolName)
    const encodedWorkerName = encodeURI(arg.workerName)
    return this.delete(`/${encodedWorkPoolName}/workers/${encodedWorkerName}`)
  }
}