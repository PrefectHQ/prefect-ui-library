import { InjectionKey } from 'vue'
import { ApiRoute } from '.'
import { Log } from '@/models/Log'
import { LogResponse } from '@/models/LogResponse'
import { Api } from '@/services/Api'
import { mapper } from '@/services/Mapper'
import { LogsRequestFilter } from '@/types/LogsRequestFilter'

export class LogsApi extends Api {

  protected route: ApiRoute = '/logs'

  public getLogs(filter?: LogsRequestFilter): Promise<Log[]> {
    return this.post<LogResponse[]>('/filter', filter)
      .then(({ data }) => mapper.map('LogResponse', data, 'Log'))
  }

}

export const logsApiKey: InjectionKey<LogsApi> = Symbol('logsApiKey')
