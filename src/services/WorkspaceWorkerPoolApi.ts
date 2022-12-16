import { WorkspaceApi } from './WorkspaceApi'
import { WorkerPool, WorkerPoolCreate, WorkerPoolEdit, WorkerPoolResponse } from '@/models'
import { mapper } from '@/services/Mapper'

export interface IWorkspaceWorkerPoolApi {
  createWorkerPool: (request: WorkerPoolCreate) => Promise<WorkerPool>,
  getWorkerPoolByName: (workerPoolName: string) => Promise<WorkerPool>,
  // getWorkerPools: (filter: any) => Promise<WorkerPool[]>,
  updateWorkerPool: (workerPoolName: string, request: WorkerPoolEdit) => Promise<void>,
  deleteWorkerPool: (workerPoolName: string) => Promise<void>,
  // getWorkerPoolRuns: (workerPoolName: string) => Promise<any[]>,
}

export class WorkspaceWorkerPoolApi extends WorkspaceApi implements IWorkspaceWorkerPoolApi {

  protected override routePrefix = '/experimental/worker_pools/'

  public async createWorkerPool(request: WorkerPoolCreate): Promise<WorkerPool> {
    const body = mapper.map('WorkerPoolCreate', request, 'WorkerPoolCreateRequest')
    const { data } = await this.post<WorkerPoolResponse>('/', body)

    return mapper.map('WorkerPoolResponse', data, 'WorkerPool')
  }

  public async getWorkerPoolByName(name: string): Promise<WorkerPool> {
    const { data } = await this.get<WorkerPoolResponse>(`/${name}`)

    return mapper.map('WorkerPoolResponse', data, 'WorkerPool')
  }

  // public async getWorkerPools(filter: any): Promise<WorkerPool[]> {
  //   const { data } = await this.post<WorkerPoolResponse[]>('/filter', filter)

  //   return mapper.map('WorkerPoolResponse', data, 'WorkerPool')
  // }

  public updateWorkerPool(name: string, request: WorkerPoolEdit): Promise<void> {
    const body = mapper.map('WorkerPoolEdit', request, 'WorkerPoolEditRequest')

    return this.patch(`/${name}`, body)
  }

  public deleteWorkerPool(name: string): Promise<void> {
    return this.delete(`/${name}`)
  }

  // public async getWorkerPoolRuns(name: string): Promise<any[]> {
  //   const { data } = await this.post<any[]>(`/${name}/get_work`)

  //   return mapper.map('RunResponse', data, 'Run')
  // }
}