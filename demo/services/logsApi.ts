import { createActions } from '@prefecthq/vue-compositions'
import { InjectionKey } from 'vue'
import { MockedApi } from './MockedApi'
import { Log } from '@/models/Log'
import { mocker } from '@/services'
import { LogsRequestFilter } from '@/types/LogsRequestFilter'

const logLevels = [null, 1, 2, 3, 4, 5]

const getRandomLogLevel = (): null | number => {
  return logLevels[Math.floor(Math.random() * logLevels.length)]
}

export class LogsApi extends MockedApi {
  public getLogs(filter?: LogsRequestFilter): Promise<Log[]> {
    return this.promise(Array.from({ length: 10 }, () => mocker.create('log', [{ level: getRandomLogLevel() }])))
  }
}

export const logsApiKey: InjectionKey<LogsApi> = Symbol('logsApiKey')
export const logsApi = createActions(new LogsApi())