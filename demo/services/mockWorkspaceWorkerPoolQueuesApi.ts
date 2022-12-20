import { MockApi } from '@/../demo/services/MockApi'
import { WorkerPoolQueue, WorkerPoolQueueCreate, WorkerPoolQueueEdit } from '@/models'
import { IWorkspaceWorkerPoolQueuesApi, mocker } from '@/services/'

export class MockWorkspaceWorkerPoolQueuesApi extends MockApi implements IWorkspaceWorkerPoolQueuesApi {

  public async createWorkerPoolQueue(workerPoolName: string, request: WorkerPoolQueueCreate): Promise<WorkerPoolQueue> {
    const workerPool = this.workerPools.find(workerPool => workerPool.name === workerPoolName)!
    const workerPoolQueue = mocker.create('workerPoolQueue', [{ ...request, workerPoolId: workerPool.id }])
    this.workerPoolQueues.create(workerPoolQueue)
    return await workerPoolQueue
  }

  public async getWorkerPoolQueues(workerPoolName: string): Promise<WorkerPoolQueue[]> {
    const workerPool = this.workerPools.find(workerPool => workerPool.name === workerPoolName)!
    const workerPoolQueues = this.workerPoolQueues.findAll(workerPoolQueue => workerPoolQueue.workerPoolId === workerPool.id)!

    return await workerPoolQueues
  }

  public async getWorkerPoolQueueByName(workerPoolName: string, queueName: string): Promise<WorkerPoolQueue> {
    const workerPool = this.workerPools.find(workerPool => workerPool.name === workerPoolName)!

    return await this.workerPoolQueues.find(workerPoolQueue => workerPoolQueue.name === queueName && workerPoolQueue.workerPoolId === workerPool.id)!
  }

  public async updateWorkerPoolQueue(workerPoolName: string, queueName: string, request: WorkerPoolQueueEdit): Promise<void> {
    const workerPool = this.workerPools.find(workerPool => workerPool.name === workerPoolName)!
    const workerPoolQueue = this.workerPoolQueues.find(workerPoolQueue => workerPoolQueue.name === queueName && workerPoolQueue.workerPoolId === workerPool.id)!

    return await this.workerPoolQueues.patch(workerPoolQueue.name, request)
  }

  public async deleteWorkerPoolQueue(workerPoolName: string, queueName: string): Promise<void> {
    const workerPool = this.workerPools.find(workerPool => workerPool.name === workerPoolName)!
    const workerPoolQueue = this.workerPoolQueues.find(workerPoolQueue => workerPoolQueue.name === queueName && workerPoolQueue.workerPoolId === workerPool.id)!

    return await this.workerPoolQueues.delete(workerPoolQueue.name)
  }

  public async updateWorkerPoolQueuePriority(workerPoolName: string, queueName: string, priority: number): Promise<void> {
    const workerPool = this.workerPools.find(workerPool => workerPool.name === workerPoolName)!
    const workerPoolQueue = this.workerPoolQueues.find(workerPoolQueue => workerPoolQueue.name === queueName && workerPoolQueue.workerPoolId === workerPool.id)!

    return await this.workerPoolQueues.patch(workerPoolQueue.name, { priority })
  }
}