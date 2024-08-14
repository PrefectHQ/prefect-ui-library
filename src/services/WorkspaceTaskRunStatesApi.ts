import { State, StateResponse } from '@/models'
import { mapper } from '@/services/Mapper'
import { WorkspaceApi } from '@/services/WorkspaceApi'

export class WorkspaceTaskRunStatesApi extends WorkspaceApi {
  protected override routePrefix = '/task_run_states'

  public async getTaskRunState(taskRunId: string): Promise<State> {
    const { data } = await this.get<StateResponse>(`/${taskRunId}`)
    return mapper.map('StateResponse', data, 'State')
  }

  public async getTaskRunStates(taskRunId: string): Promise<State[]> {
    const { data } = await this.get<StateResponse[]>(`?task_run_id=${taskRunId}`)
    return mapper.map('StateResponse', data, 'State')
  }
}