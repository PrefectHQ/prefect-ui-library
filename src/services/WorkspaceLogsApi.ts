import { LogResponse } from '@/models/api/LogResponse'
import { LogsRequestFilter } from '@/models/api/LogsRequestFilter'
import { Log } from '@/models/Log'
import { mapper } from '@/services/Mapper'
import { WorkspaceApi } from '@/services/WorkspaceApi'

export class WorkspaceLogsApi extends WorkspaceApi {

  protected routePrefix = '/logs'

  public async getLogs(filter: LogsRequestFilter = {}): Promise<Log[]> {
    const { data } = await this.post<LogResponse[]>('/filter', filter)

    return mapper.map('LogResponse', data, 'Log')
  }

}
