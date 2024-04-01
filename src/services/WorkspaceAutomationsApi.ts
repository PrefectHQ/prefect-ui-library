import { AutomationResponse } from '@/automations/types/api/automation'
import { Automation } from '@/automations/types/automation'
import { AutomationsFilter } from '@/automations/types/filter'
import { mapper } from '@/services/Mapper'
import { WorkspaceApi } from '@/services/WorkspaceApi'

export class WorkspaceAutomationsApi extends WorkspaceApi {

  protected override routePrefix = '/automations'

  public async getAutomations(filter: AutomationsFilter = {}): Promise<Automation[]> {
    const { data } = await this.post<AutomationResponse[]>('/filter', filter)

    return mapper.map('AutomationResponse', data, 'Automation')
  }

}