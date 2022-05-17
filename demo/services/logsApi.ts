import { createActions } from '@prefecthq/vue-compositions'
import { MockedApi } from './MockedApi'
import { Log } from '@/models/Log'
import { mocker } from '@/services'
import { LogsRequestFilter } from '@/types/LogsRequestFilter'

export class LogsApi extends MockedApi {
  public getLogs(filter?: LogsRequestFilter): Promise<Log[]> {
    return this.promise(mocker.createMany('log', 15))
  }
}

export const logsApi = createActions(new LogsApi())