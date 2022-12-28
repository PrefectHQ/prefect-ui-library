import { WorkerPoolQueueCreate, WorkerPoolQueue, WorkerPoolQueueEdit, WorkerPoolQueueResponse } from '@/models'
import { mapper, WorkspaceApi } from '@/services'

export interface IWorkspaceWorkerPoolQueuesApi {
  createWorkerPoolQueue: (workerPoolName: string, request: WorkerPoolQueueCreate) => Promise<WorkerPoolQueue>,
  getWorkerPoolQueues: (workerPoolName: string) => Promise<WorkerPoolQueue[]>,
  getWorkerPoolQueueByName: (workerPoolName: string, queueName: string) => Promise<WorkerPoolQueue>,
  updateWorkerPoolQueue: (workerPoolName: string, queueName: string, request: WorkerPoolQueueCreate) => Promise<void>,
  pauseWorkerPoolQueue: (workerPoolName: string, queueName: string) => Promise<void>,
  resumeWorkerPoolQueue: (workerPoolName: string, queueName: string) => Promise<void>,
  deleteWorkerPoolQueue: (workerPoolName: string, queueName: string) => Promise<void>,
}

export class WorkspaceWorkerPoolQueuesApi extends WorkspaceApi implements IWorkspaceWorkerPoolQueuesApi {

  protected override routePrefix = '/experimental/worker_pools/'

  public async createWorkerPoolQueue(workerPoolName: string, request: WorkerPoolQueueCreate): Promise<WorkerPoolQueue> {
    const body = mapper.map('WorkerPoolQueueCreate', request, 'WorkerPoolQueueCreateRequest')

    const { data } = await this.post<WorkerPoolQueueResponse>(`/${workerPoolName}/queues`, body)

    return mapper.map('WorkerPoolQueueResponse', data, 'WorkerPoolQueue')
  }

  public async getWorkerPoolQueues(workerPoolName: string): Promise<WorkerPoolQueue[]> {
    const { data } = await this.get<WorkerPoolQueueResponse[]>(`/${workerPoolName}/queues`)

    return mapper.map('WorkerPoolQueueResponse', data, 'WorkerPoolQueue')
  }

  public async getWorkerPoolQueueByName(workerPoolName: string, queueName: string): Promise<WorkerPoolQueue> {
    const { data } = await this.get<WorkerPoolQueueResponse>(`/${workerPoolName}/queues/${queueName}/`)

    return mapper.map('WorkerPoolQueueResponse', data, 'WorkerPoolQueue')
  }

  public updateWorkerPoolQueue(workerPoolName: string, queueName: string, request: WorkerPoolQueueEdit): Promise<void> {
    const body = mapper.map('WorkerPoolQueueEdit', request, 'WorkerPoolQueueEditRequest')

    return this.patch(`/${workerPoolName}/queues/${queueName}`, body)
  }

  public pauseWorkerPoolQueue(workerPoolName: string, queueName: string): Promise<void> {
    return this.patch(`/${workerPoolName}/queues/${queueName}`, { 'is_paused': true })
  }

  public resumeWorkerPoolQueue(workerPoolName: string, queueName: string): Promise<void> {
    return this.patch(`/${workerPoolName}/queues/${queueName}`, { 'is_paused': false })
  }

  public deleteWorkerPoolQueue(workerPoolName: string, queueName: string): Promise<void> {
    return this.delete(`/${workerPoolName}/queues/${queueName}`)
  }

  public updateWorkerPoolQueuePriority(workerPoolName: string, queueName: string, priority: number): Promise<void> {
    return this.patch(`/${workerPoolName}/queues/${queueName}/update_priority`, { priority })
  }
}