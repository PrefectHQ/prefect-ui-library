import { FlowRun, FlowRunResponse, WorkQueueCreate, WorkQueueEdit, WorkQueueResponse, WorkQueueStatus, WorkQueueStatusResponse } from '@/models'
import { WorkQueuesFilter } from '@/models/Filters'
import { WorkQueue } from '@/models/WorkQueue'
import { mapper } from '@/services/Mapper'
import { WorkspaceApi } from '@/services/WorkspaceApi'

export interface IWorkspaceWorkQueuesApi {
  getWorkQueue: (workQueueId: string) => Promise<WorkQueue>,
  getWorkQueueByName: (workQueueName: string) => Promise<WorkQueue>,
  getWorkQueues: (filter: WorkQueuesFilter) => Promise<WorkQueue[]>,
  createWorkQueue: (request: WorkQueueCreate) => Promise<WorkQueue>,
  pauseWorkQueue: (workQueueId: string) => Promise<void>,
  resumeWorkQueue: (workQueueId: string) => Promise<void>,
  updateWorkQueue: (workQueueId: string, request: WorkQueueEdit) => Promise<void>,
  deleteWorkQueue: (workQueueId: string) => Promise<void>,
  getRuns: (workQueueId: string) => Promise<FlowRun[]>,
  getWorkQueueStatus: (workQueueId: string) => Promise<WorkQueueStatus>,
}

export class WorkspaceWorkQueuesApi extends WorkspaceApi implements IWorkspaceWorkQueuesApi {

  protected routePrefix = '/work_queues'

  public async getWorkQueue(id: string): Promise<WorkQueue> {
    const { data } = await this.get<WorkQueueResponse>(`/${id}`)

    return mapper.map('WorkQueueResponse', data, 'WorkQueue')
  }

  public async getWorkQueueByName(name: string): Promise<WorkQueue> {
    const { data } = await this.get<WorkQueueResponse>(`/name/${name}`)

    return mapper.map('WorkQueueResponse', data, 'WorkQueue')
  }

  public async getWorkQueues(filter: WorkQueuesFilter): Promise<WorkQueue[]> {
    const request = mapper.map('WorkQueuesFilter', filter, 'WorkQueuesFilterRequest')
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

  public async getWorkQueueStatus(id: string): Promise<WorkQueueStatus> {
    const { data } = await this.get<WorkQueueStatusResponse>(`/${id}/status`)

    return mapper.map('WorkQueueStatusResponse', data, 'WorkQueueStatus')
  }
}