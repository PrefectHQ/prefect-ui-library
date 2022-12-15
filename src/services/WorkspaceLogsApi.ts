import { Log } from '@/models/Log'
import { LogResponse } from '@/models/LogResponse'
import { mapper } from '@/services/Mapper'
import { WorkspaceApi } from '@/services/WorkspaceApi'
import { LogsRequestFilter } from '@/types/LogsRequestFilter'

export class WorkspaceLogsApi extends WorkspaceApi {

  protected routePrefix = '/logs'

  public async getLogs(filter: LogsRequestFilter = {}): Promise<Log[]> {
    const { data } = await this.post<LogResponse[]>('/filter', filter)

    return mapper.map('LogResponse', data, 'Log')
  }

}
