import { WorkPool, WorkPoolCreate, WorkPoolEdit, WorkPoolResponse, WorkerScheduledFlowRunResponse, WorkerScheduledFlowRun, WorkerScheduledFlowRuns } from '@/models'
import { WorkPoolsFilter } from '@/models/Filters'
import { mapper, WorkspaceApi } from '@/services'

export class WorkspaceWorkPoolsApi extends WorkspaceApi {

  protected override routePrefix = '/work_pools/'

  public async createWorkPool(request: WorkPoolCreate): Promise<WorkPool> {
    const body = mapper.map('WorkPoolCreate', request, 'WorkPoolCreateRequest')
    const { data } = await this.post<WorkPoolResponse>('/', body)

    return mapper.map('WorkPoolResponse', data, 'WorkPool')
  }

  public async getWorkPoolByName(name: string): Promise<WorkPool> {
    const { data } = await this.get<WorkPoolResponse>(encodeURI(`/${name}`))

    return mapper.map('WorkPoolResponse', data, 'WorkPool')
  }

  public async getWorkPools(filter: WorkPoolsFilter = {}): Promise<WorkPool[]> {
    const request = mapper.map('WorkPoolsFilter', filter, 'WorkPoolsFilterRequest')
    const { data } = await this.post<WorkPoolResponse[]>('/filter', request)

    return mapper.map('WorkPoolResponse', data, 'WorkPool')
  }

  public updateWorkPool(name: string, request: WorkPoolEdit): Promise<void> {
    const body = mapper.map('WorkPoolEdit', request, 'WorkPoolEditRequest')

    return this.patch(encodeURI(`/${name}`), body)
  }

  public pauseWorkPool(name: string): Promise<void> {
    return this.patch(encodeURI(`/${name}`), { 'is_paused': true })
  }

  public resumeWorkPool(name: string): Promise<void> {
    return this.patch(encodeURI(`/${name}`), { 'is_paused': false })
  }

  public deleteWorkPool(name: string): Promise<void> {
    return this.delete(encodeURI(`/${name}`))
  }

  public async getWorkPoolScheduledRuns(name: string, request: WorkerScheduledFlowRuns): Promise<WorkerScheduledFlowRun[]> {
    const body = mapper.map('WorkerScheduledFlowRuns', request, 'WorkerScheduledFlowRunsRequest')
    const { data } = await this.post<WorkerScheduledFlowRunResponse[]>(encodeURI(`/${name}/get_scheduled_flow_runs`), body)

    return mapper.map('WorkerScheduledFlowRunResponse', data, 'WorkerScheduledFlowRun')
  }

  public async getWorkPoolLateRuns(name: string, request: WorkerScheduledFlowRuns): Promise<WorkerScheduledFlowRun[]> {
    const data = await this.getWorkPoolScheduledRuns(name, request)

    return data.filter(run => run.flowRun.stateName === 'Late')
  }
}