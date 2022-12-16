import { WorkspaceApi } from './WorkspaceApi'
import { WorkerPoolQueueCreate, WorkerPoolQueue, WorkerPoolQueueEdit, WorkerPoolQueueResponse } from '@/models'
import { mapper } from '@/services/Mapper'

export interface IWorkspaceWorkerPoolQueueApi {
  createWorkerPoolQueue: (workerPoolName: string, request: WorkerPoolQueueCreate) => Promise<WorkerPoolQueue>,
  getWorkerPoolQueues: (workerPoolName: string) => Promise<WorkerPoolQueue[]>,
  getWorkerPoolQueueByName: (workerPoolName: string, queueName: string) => Promise<WorkerPoolQueue>,
  // updateWorkerPoolQueue: (workerPoolName: string, queueName: string, request: WorkerPoolQueueCreate) => Promise<void>,
  // deleteWorkerPoolQueue: (workerPoolName: string, queueName: string) => Promise<void>,
  // updateWorkerPoolQueuePriority: (workerPoolName: string, queueName: string, priority: number) => Promise<void>,
  // updateWorkerPoolQueue: (workerPoolName: string, queueName: string) => Promise<any[]>,
}

export class WorkspaceWorkerPoolQueueApi extends WorkspaceApi implements IWorkspaceWorkerPoolQueueApi {

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
    const { data } = await this.get<WorkerPoolQueueResponse>(`/${workerPoolName}/queues/${queueName}`)

    return mapper.map('WorkerPoolQueueResponse', data, 'WorkerPoolQueue')
  }

  // public updateWorkerPoolQueue(workerPoolName: string, queueName: string, request: WorkerPoolQueueEdit): Promise<void> {
  //   const body = mapper.map('WorkerPoolQueueEdit', request, 'WorkerPoolQueueEditRequest')

  //   return this.patch(`/${workerPoolName}/queues/${queueName}`, body)
  // }

  // public deleteWorkerPoolQueue(workerPoolName: string, queueName: string): Promise<void> {
  //   return this.delete(`/${workerPoolName}/queues/${queueName}`)
  // }

  // public updateWorkerPoolQueuePriority(workerPoolName: string, queueName: string, priority: number): Promise<void> {
  //   return this.patch(`/${workerPoolName}/queues/${queueName}/update_priority`, { priority })
  // }

  // public async getWorkerPoolRuns(name: string): Promise<any[]> {
  //   const { data } = await this.post<any[]>(`/${name}/get_work`)

  //   return mapper.map('RunResponse', data, 'Run')
  // }
}