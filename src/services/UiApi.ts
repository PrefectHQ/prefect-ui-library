import { InjectionKey } from 'vue'
import { UiFlowRunHistoryResponse } from '@/models/api/UiFlowRunHistoryResponse'
import { FlowRunsHistoryFilter } from '@/models/Filters'
import { UiFlowRunHistory } from '@/models/UiFlowRunHistory'
import { Api, ApiRoute } from '@/services/Api'
import { mapper } from '@/services/Mapper'

export class UiApi extends Api {

  protected route: ApiRoute = '/ui'

  public async getFlowRunHistory(filter: FlowRunsHistoryFilter): Promise<UiFlowRunHistory[]> {
    const request = mapper.map('FlowRunsHistoryFilter', filter, 'FlowRunsHistoryFilterRequest')
    const { data } = await this.post<UiFlowRunHistoryResponse[]>('/flow_runs/history', request)

    return mapper.map('UiFlowRunHistoryResponse', data, 'UiFlowRunHistory')
  }

}

export const uiApiKey: InjectionKey<UiApi> = Symbol('uiApiKey')