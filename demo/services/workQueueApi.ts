import { createActions } from '@prefecthq/vue-compositions'
import { MockedApi } from './MockedApi'
import { WorkQueue } from '@/models/WorkQueue'
import { mocker } from '@/services'

export class WorkQueueApi extends MockedApi {
  public getWorkQueue(id: string): Promise<WorkQueue> {
    return this.promise(mocker.create('workQueue', [{ id: id }]))
  }
}

export const workQueueApi = createActions(new WorkQueueApi())