import { WorkPool, WorkPoolCreate, WorkPoolEdit, WorkPoolResponse, WorkerScheduledFlowRunResponse, WorkerScheduledFlowRun, WorkerScheduledFlowRuns } from '@/models'
import { mapper, WorkspaceApi } from '@/services'
import { PaginatedWorkPoolFilter } from '@/types'

export interface IWorkspaceWorkPoolsApi {
  createWorkPool: (request: WorkPoolCreate) => Promise<WorkPool>,
  getWorkPoolByName: (workPoolName: string) => Promise<WorkPool>,
  getWorkPools: (filter: PaginatedWorkPoolFilter) => Promise<WorkPool[]>,
  updateWorkPool: (workPoolName: string, request: WorkPoolEdit) => Promise<void>,
  pauseWorkPool: (workPoolName: string) => Promise<void>,
  resumeWorkPool: (workPoolName: string) => Promise<void>,
  deleteWorkPool: (workPoolName: string) => Promise<void>,
  getWorkPoolScheduledRuns: (workPoolName: string, request: WorkerScheduledFlowRuns) => Promise<WorkerScheduledFlowRun[]>,
  getWorkPoolLateRuns: (workPoolName: string, request: WorkerScheduledFlowRuns) => Promise<WorkerScheduledFlowRun[]>,
}

export class WorkspaceWorkPoolsApi extends WorkspaceApi implements IWorkspaceWorkPoolsApi {

  protected override routePrefix = '/experimental/work_pools/'

  public async createWorkPool(request: WorkPoolCreate): Promise<WorkPool> {
    const body = mapper.map('WorkPoolCreate', request, 'WorkPoolCreateRequest')
    const { data } = await this.post<WorkPoolResponse>('/', body)

    return mapper.map('WorkPoolResponse', data, 'WorkPool')
  }

  public async getWorkPoolByName(name: string): Promise<WorkPool> {
    const { data } = await this.get<WorkPoolResponse>(`/${name}`)

    return mapper.map('WorkPoolResponse', data, 'WorkPool')
  }

  public async getWorkPools(filter: PaginatedWorkPoolFilter = {}): Promise<WorkPool[]> {
    const { data } = await this.post<WorkPoolResponse[]>('/filter', filter)

    return mapper.map('WorkPoolResponse', data, 'WorkPool')
  }

  public updateWorkPool(name: string, request: WorkPoolEdit): Promise<void> {
    const body = mapper.map('WorkPoolEdit', request, 'WorkPoolEditRequest')

    return this.patch(`/${name}`, body)
  }

  public pauseWorkPool(name: string): Promise<void> {
    return this.patch(`/${name}`, { 'is_paused': true })
  }

  public resumeWorkPool(name: string): Promise<void> {
    return this.patch(`/${name}`, { 'is_paused': false })
  }

  public deleteWorkPool(name: string): Promise<void> {
    return this.delete(`/${name}`)
  }

  public async getWorkPoolScheduledRuns(name: string, request: WorkerScheduledFlowRuns): Promise<WorkerScheduledFlowRun[]> {
    const body = mapper.map('WorkerScheduledFlowRuns', request, 'WorkerScheduledFlowRunsRequest')
    const { data } = await this.post<WorkerScheduledFlowRunResponse[]>(`/${name}/get_scheduled_flow_runs`, body)

    return mapper.map('WorkerScheduledFlowRunResponse', data, 'WorkerScheduledFlowRun')
  }

  public async getWorkPoolLateRuns(name: string, request: WorkerScheduledFlowRuns): Promise<WorkerScheduledFlowRun[]> {
    const data = await this.getWorkPoolScheduledRuns(name, request)

    return data.filter(run => run.flowRun.stateName === 'Late')
  }
}