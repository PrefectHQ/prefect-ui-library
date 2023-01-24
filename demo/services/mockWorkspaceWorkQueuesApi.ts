import { MockApi } from './MockApi'
import { FlowRun, WorkQueue, WorkQueueCreate, WorkQueueEdit, WorkQueueStatus } from '@/models'
import { WorkQueuesFilter } from '@/models/Filters'
import { IWorkspaceWorkQueuesApi, mocker } from '@/services'

export class MockWorkspaceWorkQueuesApi extends MockApi implements IWorkspaceWorkQueuesApi {

  public async getWorkQueue(workQueueId: string): Promise<WorkQueue> {
    return await this.workQueues.get(workQueueId)
  }

  public async getWorkQueueByName(workQueueName: string): Promise<WorkQueue> {
    return await this.workQueues.find(workQueue => workQueue.name === workQueueName)!
  }

  public async getWorkQueues(filter: WorkQueuesFilter): Promise<WorkQueue[]> {
    if (Object.keys(filter).length) {
      console.warn('MockWorkspaceWorkQueuesApi has not implemented the filter argument of the getWorkQueues method')
    }

    return await this.workQueues.getAll()
  }

  public async createWorkQueue(request: WorkQueueCreate): Promise<WorkQueue> {
    const workQueue = mocker.create('workQueue', [request])

    this.workQueues.create(workQueue)

    return await workQueue
  }

  public async pauseWorkQueue(workQueueId: string): Promise<void> {
    return await this.workQueues.patch(workQueueId, { isPaused: true })
  }

  public async resumeWorkQueue(workQueueId: string): Promise<void> {
    return await this.workQueues.patch(workQueueId, { isPaused: false })
  }

  public async updateWorkQueue(workQueueId: string, request: WorkQueueEdit): Promise<void> {
    return await this.workQueues.patch(workQueueId, request)
  }

  public async deleteWorkQueue(workQueueId: string): Promise<void> {
    return await this.workQueues.delete(workQueueId)
  }

  public async getRuns(workQueueId: string): Promise<FlowRun[]> {
    const workQueue = this.workQueues.get(workQueueId)

    return await this.flowRuns.findAll(flowRun => flowRun.workQueueName == workQueue.name)
  }

  public async getWorkQueueStatus(): Promise<WorkQueueStatus> {
    return await mocker.create('workQueueStatus')
  }


}
