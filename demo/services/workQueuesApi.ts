import { createActions } from '@prefecthq/vue-compositions'
import { MockedApi } from './MockedApi'

export class WorkQueueApi extends MockedApi {
  public pauseWorkQueue(id: string): Promise<void> {
    return new Promise<void>(resolve => resolve())
  }

  public resumeWorkQueue(id: string): Promise<void> {
    return new Promise<void>(resolve => resolve())
  }
}

export const workQueueApi = createActions(new WorkQueueApi())