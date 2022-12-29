import { InjectionKey } from 'vue'
import { UiFlowRunHistoryResponse } from '@/models/api/UiFlowRunHistoryResponse'
import { UnionFilters } from '@/models/api/UnionFilters'
import { UiFlowRunHistory } from '@/models/UiFlowRunHistory'
import { Api, ApiRoute } from '@/services/Api'
import { mapper } from '@/services/Mapper'

export class UiApi extends Api {

  protected route: ApiRoute = '/ui'

  public getFlowRunHistory(filter: UnionFilters): Promise<UiFlowRunHistory[]> {
    return this.post<UiFlowRunHistoryResponse[]>('/flow_runs/history', filter)
      .then(({ data }) => mapper.map('UiFlowRunHistoryResponse', data, 'UiFlowRunHistory'))
  }

}

export const uiApiKey: InjectionKey<UiApi> = Symbol('uiApiKey')