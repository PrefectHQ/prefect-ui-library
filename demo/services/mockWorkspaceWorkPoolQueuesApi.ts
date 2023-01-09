import { MockApi } from './MockApi'
import { WorkPoolQueue, WorkPoolQueueCreate, WorkPoolQueueEdit } from '@/models'
import { IWorkspaceWorkPoolQueuesApi, mocker } from '@/services/'

export class MockWorkspaceWorkPoolQueuesApi extends MockApi implements IWorkspaceWorkPoolQueuesApi {

  public async createWorkPoolQueue(workPoolName: string, request: WorkPoolQueueCreate): Promise<WorkPoolQueue> {
    const workPool = this.workPools.find(workPool => workPool.name === workPoolName)!
    const workPoolQueue = mocker.create('workPoolQueue', [{ ...request, workPoolId: workPool.id }])
    this.workPoolQueues.create(workPoolQueue)

    return await workPoolQueue
  }

  public async getWorkPoolQueues(workPoolName: string): Promise<WorkPoolQueue[]> {
    const workPool = this.workPools.find(workPool => workPool.name === workPoolName)!
    const workPoolQueues = this.workPoolQueues.findAll(workPoolQueue => workPoolQueue.workPoolId === workPool.id)!

    return await workPoolQueues
  }

  public async getWorkPoolQueueByName(workPoolName: string, queueName: string): Promise<WorkPoolQueue> {
    const workPool = this.workPools.find(workPool => workPool.name === workPoolName)!

    return await this.workPoolQueues.find(workPoolQueue => workPoolQueue.name === queueName && workPoolQueue.workPoolId === workPool.id)!
  }

  public async updateWorkPoolQueue(workPoolName: string, queueName: string, request: WorkPoolQueueEdit): Promise<void> {
    const workPool = this.workPools.find(workPool => workPool.name === workPoolName)!
    const workPoolQueue = this.workPoolQueues.find(workPoolQueue => workPoolQueue.name === queueName && workPoolQueue.workPoolId === workPool.id)!

    return await this.workPoolQueues.patch(workPoolQueue.name, request)
  }

  public async pauseWorkPoolQueue(workPoolName: string, queueName: string): Promise<void> {
    const workPool = this.workPools.find(workPool => workPool.name === workPoolName)!
    const workPoolQueue = this.workPoolQueues.find(workPoolQueue => workPoolQueue.name === queueName && workPoolQueue.workPoolId === workPool.id)!

    return await this.workPools.patch(workPoolQueue.name, { isPaused: true })
  }

  public async resumeWorkPoolQueue(workPoolName: string, queueName: string): Promise<void> {
    const workPool = this.workPools.find(workPool => workPool.name === workPoolName)!
    const workPoolQueue = this.workPoolQueues.find(workPoolQueue => workPoolQueue.name === queueName && workPoolQueue.workPoolId === workPool.id)!

    return await this.workPools.patch(workPoolQueue.name, { isPaused: false })
  }

  public async deleteWorkPoolQueue(workPoolName: string, queueName: string): Promise<void> {
    const workPool = this.workPools.find(workPool => workPool.name === workPoolName)!
    const workPoolQueue = this.workPoolQueues.find(workPoolQueue => workPoolQueue.name === queueName && workPoolQueue.workPoolId === workPool.id)!
    return await this.workPoolQueues.delete(workPoolQueue.id)
  }

  public async updateWorkPoolQueuePriority(workPoolName: string, queueName: string, priority: number): Promise<void> {
    const workPool = this.workPools.find(workPool => workPool.name === workPoolName)!
    const workPoolQueue = this.workPoolQueues.find(workPoolQueue => workPoolQueue.name === queueName && workPoolQueue.workPoolId === workPool.id)!

    return await this.workPoolQueues.patch(workPoolQueue.name, { priority })
  }
}