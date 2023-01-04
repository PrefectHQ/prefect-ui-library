import { WorkerPool, WorkerPoolCreate, WorkerPoolEdit, WorkerPoolResponse, WorkerScheduledFlowRunResponse, WorkerScheduledFlowRun, WorkerScheduledFlowRuns } from '@/models'
import { mapper, WorkspaceApi } from '@/services'
import { PaginatedWorkerPoolFilter } from '@/types'

export interface IWorkspaceWorkerPoolsApi {
  createWorkerPool: (request: WorkerPoolCreate) => Promise<WorkerPool>,
  getWorkerPoolByName: (workerPoolName: string) => Promise<WorkerPool>,
  getWorkerPools: (filter: PaginatedWorkerPoolFilter) => Promise<WorkerPool[]>,
  updateWorkerPool: (workerPoolName: string, request: WorkerPoolEdit) => Promise<void>,
  pauseWorkerPool: (workerPoolName: string) => Promise<void>,
  resumeWorkerPool: (workerPoolName: string) => Promise<void>,
  deleteWorkerPool: (workerPoolName: string) => Promise<void>,
  getWorkerPoolScheduledRuns: (workerPoolName: string, request: WorkerScheduledFlowRuns) => Promise<WorkerScheduledFlowRun[]>,
}

export class WorkspaceWorkerPoolsApi extends WorkspaceApi implements IWorkspaceWorkerPoolsApi {

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

  public async getWorkerPools(filter: PaginatedWorkerPoolFilter = {}): Promise<WorkerPool[]> {
    const { data } = await this.post<WorkerPoolResponse[]>('/filter', filter)

    return mapper.map('WorkerPoolResponse', data, 'WorkerPool')
  }

  public updateWorkerPool(name: string, request: WorkerPoolEdit): Promise<void> {
    const body = mapper.map('WorkerPoolEdit', request, 'WorkerPoolEditRequest')

    return this.patch(`/${name}`, body)
  }

  public pauseWorkerPool(name: string): Promise<void> {
    return this.patch(`/${name}`, { 'is_paused': true })
  }

  public resumeWorkerPool(name: string): Promise<void> {
    return this.patch(`/${name}`, { 'is_paused': false })
  }

  public deleteWorkerPool(name: string): Promise<void> {
    return this.delete(`/${name}`)
  }

  public async getWorkerPoolScheduledRuns(name: string, request: WorkerScheduledFlowRuns): Promise<WorkerScheduledFlowRun[]> {
    const body = mapper.map('WorkerScheduledFlowRuns', request, 'WorkerScheduledFlowRunsRequest')
    const { data } = await this.post<WorkerScheduledFlowRunResponse[]>(`/${name}/get_scheduled_flow_runs`, body)

    return mapper.map('WorkerScheduledFlowRunResponse', data, 'WorkerScheduledFlowRun')
  }
}