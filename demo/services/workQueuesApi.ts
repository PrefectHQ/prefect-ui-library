import { createActions } from '@prefecthq/vue-compositions'
import { MockedApi } from './MockedApi'

export class WorkQueueApi extends MockedApi {
  public pauseWorkQueue(id: string): Promise<void> {
    return this.void()
  }

  public resumeWorkQueue(id: string): Promise<void> {
    return this.void()
  }
}

export const workQueueApi = createActions(new WorkQueueApi())