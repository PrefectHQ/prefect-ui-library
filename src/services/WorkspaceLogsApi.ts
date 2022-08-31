import { WorkspaceApi } from './WorkspaceApi'
import { Log } from '@/models/Log'
import { LogResponse } from '@/models/LogResponse'
import { mapper } from '@/services/Mapper'
import { LogsRequestFilter } from '@/types/LogsRequestFilter'

export class WorkspaceLogsApi extends WorkspaceApi {

  protected prefix = '/logs'

  public async getLogs(filter: LogsRequestFilter = {}): Promise<Log[]> {
    const { data } = await this.post<LogResponse[]>('/filter', filter)

    return mapper.map('LogResponse', data, 'Log')
  }

}
