import { WorkPoolQueueCreate, WorkPoolQueue, WorkPoolQueueEdit, WorkPoolQueueResponse } from '@/models'
import { WorkPoolQueuesFilter } from '@/models/Filters'
import { mapper, WorkspaceApi } from '@/services'

export interface IWorkspaceWorkPoolQueuesApi {
  createWorkPoolQueue: (workPoolName: string, request: WorkPoolQueueCreate) => Promise<WorkPoolQueue>,
  getWorkPoolQueues: (workPoolName: string, filter: WorkPoolQueuesFilter) => Promise<WorkPoolQueue[]>,
  getWorkPoolQueueByName: (workPoolName: string, queueName: string) => Promise<WorkPoolQueue>,
  updateWorkPoolQueue: (workPoolName: string, queueName: string, request: WorkPoolQueueCreate) => Promise<void>,
  pauseWorkPoolQueue: (workPoolName: string, queueName: string) => Promise<void>,
  resumeWorkPoolQueue: (workPoolName: string, queueName: string) => Promise<void>,
  deleteWorkPoolQueue: (workPoolName: string, queueName: string) => Promise<void>,
}

export class WorkspaceWorkPoolQueuesApi extends WorkspaceApi implements IWorkspaceWorkPoolQueuesApi {

  protected override routePrefix = '/experimental/work_pools/'

  public async createWorkPoolQueue(workPoolName: string, request: WorkPoolQueueCreate): Promise<WorkPoolQueue> {
    const body = mapper.map('WorkPoolQueueCreate', request, 'WorkPoolQueueCreateRequest')

    const { data } = await this.post<WorkPoolQueueResponse>(`/${workPoolName}/queues`, body)

    return mapper.map('WorkPoolQueueResponse', data, 'WorkPoolQueue')
  }

  public async getWorkPoolQueues(workPoolName: string, filter: WorkPoolQueuesFilter = {}): Promise<WorkPoolQueue[]> {
    const body = mapper.map('WorkPoolQueuesFilter', filter, 'WorkPoolQueuesFilterRequest')
    const { data } = await this.post<WorkPoolQueueResponse[]>(`/${workPoolName}/queues/filter`, body)

    return mapper.map('WorkPoolQueueResponse', data, 'WorkPoolQueue')
  }

  public async getWorkPoolQueueByName(workPoolName: string, queueName: string): Promise<WorkPoolQueue> {
    const { data } = await this.get<WorkPoolQueueResponse>(`/${workPoolName}/queues/${queueName}`)

    return mapper.map('WorkPoolQueueResponse', data, 'WorkPoolQueue')
  }

  public updateWorkPoolQueue(workPoolName: string, queueName: string, request: WorkPoolQueueEdit): Promise<void> {
    const body = mapper.map('WorkPoolQueueEdit', request, 'WorkPoolQueueEditRequest')

    return this.patch(`/${workPoolName}/queues/${queueName}`, body)
  }

  public pauseWorkPoolQueue(workPoolName: string, queueName: string): Promise<void> {
    return this.patch(`/${workPoolName}/queues/${queueName}`, { 'is_paused': true })
  }

  public resumeWorkPoolQueue(workPoolName: string, queueName: string): Promise<void> {
    return this.patch(`/${workPoolName}/queues/${queueName}`, { 'is_paused': false })
  }

  public deleteWorkPoolQueue(workPoolName: string, queueName: string): Promise<void> {
    return this.delete(`/${workPoolName}/queues/${queueName}`)
  }

  public updateWorkPoolQueuePriority(workPoolName: string, queueName: string, priority: number): Promise<void> {
    return this.patch(`/${workPoolName}/queues/${queueName}/update_priority`, { priority })
  }
}