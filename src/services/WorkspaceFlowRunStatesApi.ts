import { State, StateResponse } from '@/models'
import { mapper } from '@/services/Mapper'
import { WorkspaceApi } from '@/services/WorkspaceApi'

export class WorkspaceFlowRunStatesApi extends WorkspaceApi {
  protected override routePrefix = '/flow_run_states'

  public async getFlowRunState(flowRunId: string): Promise<State> {
    const { data } = await this.get<StateResponse>(`/${flowRunId}`)
    return mapper.map('StateResponse', data, 'State')
  }

  public async getFlowRunStates(flowRunId: string): Promise<State[]> {
    const { data } = await this.get<StateResponse[]>(`?flow_run_id=${flowRunId}`)
    return mapper.map('StateResponse', data, 'State')
  }
}