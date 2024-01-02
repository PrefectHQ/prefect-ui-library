import { LogResponse } from '@/models/api/LogResponse'
import { LogsFilter } from '@/models/Filters'
import { Log } from '@/models/Log'
import { mapper } from '@/services/Mapper'
import { WorkspaceApi } from '@/services/WorkspaceApi'

export class WorkspaceLogsApi extends WorkspaceApi {

  protected override routePrefix = '/logs'

  public async getLogs(filter: LogsFilter = {}): Promise<Log[]> {
    const request = mapper.map('LogsFilter', filter, 'LogsFilterRequest')
    const { data } = await this.post<LogResponse[]>('/filter', request)

    return mapper.map('LogResponse', data, 'Log')
  }

}
