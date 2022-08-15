import { createActions } from '@prefecthq/vue-compositions'
import { MockedApi } from './MockedApi'
import { WorkQueue } from '@/models'
import { mocker } from '@/services'
import { PaginatedFilter } from '@/types'

export class WorkQueueApi extends MockedApi {
  public pauseWorkQueue(id: string): Promise<void> {
    return this.void()
  }

  public resumeWorkQueue(id: string): Promise<void> {
    return this.void()
  }

  public deleteWorkQueue(id: string): Promise<void> {
    return this.void()
  }

  public getWorkQueueByName(name: string): Promise<WorkQueue> {
    return this.promise(mocker.create('workQueue', [{ name }]))
  }

  public getWorkQueues(filter: PaginatedFilter): Promise<WorkQueue[]> {
    return this.promise(mocker.createMany('workQueue', mocker.create('number', [1, 10])))
  }
}

export const workQueueApi = createActions(new WorkQueueApi())