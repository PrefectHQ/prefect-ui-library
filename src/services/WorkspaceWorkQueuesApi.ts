import { WorkspaceApi } from './WorkspaceApi'
import { FlowRun, FlowRunResponse, WorkQueueCreate, WorkQueueEdit, WorkQueueResponse } from '@/models'
import { WorkQueue } from '@/models/WorkQueue'
import { mapper } from '@/services/Mapper'
import { PaginatedFilter } from '@/types/UnionFilters'

export class WorkspaceWorkQueuesApi extends WorkspaceApi {

  protected routePrefix = '/work_queues'

  public async getWorkQueue(id: string): Promise<WorkQueue> {
    const { data } = await this.get<WorkQueueResponse>(`/${id}`)

    return mapper.map('WorkQueueResponse', data, 'WorkQueue')
  }

  public async getWorkQueueByName(name: string): Promise<WorkQueue> {
    const { data } = await this.get<WorkQueueResponse>(`/name/${name}`)

    return mapper.map('WorkQueueResponse', data, 'WorkQueue')
  }

  public async getWorkQueues(filter: PaginatedFilter): Promise<WorkQueue[]> {
    const { data } = await this.post<WorkQueueResponse[]>('/filter', filter)

    return mapper.map('WorkQueueResponse', data, 'WorkQueue')
  }

  public async createWorkQueue(request: WorkQueueCreate): Promise<WorkQueue> {
    const body = mapper.map('WorkQueueCreate', request, 'WorkQueueCreateRequest')
    const { data } = await this.post<WorkQueueResponse>('/', body)

    return mapper.map('WorkQueueResponse', data, 'WorkQueue')
  }

  public pauseWorkQueue(id: string): Promise<void> {
    return this.patch(`/${id}`, { 'is_paused': true })
  }

  public resumeWorkQueue(id: string): Promise<void> {
    return this.patch(`/${id}`, { 'is_paused': false })
  }

  public updateWorkQueue(id: string, request: WorkQueueEdit): Promise<void> {
    const body = mapper.map('WorkQueueEdit', request, 'WorkQueueEditRequest')

    return this.patch(`/${id}`, body)
  }

  public deleteWorkQueue(id: string): Promise<void> {
    return this.delete(`/${id}`)
  }

  public async getRuns(id: string): Promise<FlowRun[]> {
    const { data } = await this.post<FlowRunResponse[]>(`/${id}/get_runs`)

    return mapper.map('FlowRunResponse', data, 'FlowRun')
  }
}