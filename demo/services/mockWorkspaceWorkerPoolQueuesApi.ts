import { MockApi } from '@/../demo/services/MockApi'
import { WorkerPoolQueue, WorkerPoolQueueCreate, WorkerPoolQueueEdit } from '@/models'
import { IWorkspaceWorkerPoolQueuesApi, mocker } from '@/services/'

export class MockWorkspaceWorkerPoolQueuesApi extends MockApi implements IWorkspaceWorkerPoolQueuesApi {

  public async createWorkerPoolQueue(workerPoolName: string, request: WorkerPoolQueueCreate): Promise<WorkerPoolQueue> {
    const workerPoolQueue = mocker.create('workerPoolQueue', [request])
    this.workerPoolQueues.create(workerPoolQueue)
    return await workerPoolQueue
  }

  public async getWorkerPoolQueues(workerPoolName: string): Promise<WorkerPoolQueue[]> {
    return await this.workerPoolQueues.getAll()
  }

  public async getWorkerPoolQueueByName(workerPoolName: string, queueName: string): Promise<WorkerPoolQueue> {
    return await this.workerPoolQueues.find(workerPoolQueue => workerPoolQueue.name === queueName)!
  }

  public async updateWorkerPoolQueue(workerPoolName: string, queueName: string, request: WorkerPoolQueueEdit): Promise<void> {
    return await this.workerPoolQueues.patch(queueName, request)
  }

  public async deleteWorkerPoolQueue(workerPoolName: string, queueName: string): Promise<void> {
    return await this.workerPoolQueues.delete(queueName)
  }

  public async updateWorkerPoolQueuePriority(workerPoolName: string, queueName: string, priority: number): Promise<void> {
    return await this.workerPoolQueues.patch(queueName, { priority })
  }
}