import { TaskRunResponse } from '@/models/api/TaskRunResponse'
import { StateUpdate } from '@/models/StateUpdate'
import { TaskRun } from '@/models/TaskRun'
import { mapper } from '@/services/Mapper'
import { WorkspaceApi } from '@/services/WorkspaceApi'
import { UnionFilters } from '@/types/UnionFilters'

export interface IWorkspaceTaskRunsApi {
  getTaskRun: (taskRunId: string) => Promise<TaskRun>,
  getTaskRuns: (filter: UnionFilters) => Promise<TaskRun[]>,
  getTaskRunsCount: (filter: UnionFilters) => Promise<number>,
  setTaskRunState: (taskRunId: string, body: StateUpdate) => Promise<void>,
  deleteTaskRun: (taskRunId: string) => Promise<void>,
}

export class WorkspaceTaskRunsApi extends WorkspaceApi implements IWorkspaceTaskRunsApi {

  protected routePrefix = '/task_runs'

  public async getTaskRun(id: string): Promise<TaskRun> {
    const { data } = await this.get<TaskRunResponse>(`/${id}`)

    return mapper.map('TaskRunResponse', data, 'TaskRun')
  }

  public async getTaskRuns(filter: UnionFilters = {}): Promise<TaskRun[]> {
    const { data } = await this.post<TaskRunResponse[]>('/filter', filter)

    return mapper.map('TaskRunResponse', data, 'TaskRun')
  }

  public async getTaskRunsCount(filter: UnionFilters = {}): Promise<number> {
    const { data } = await this.post<number>('/count', filter)

    return data
  }

  public setTaskRunState(id: string, body: StateUpdate): Promise<void> {
    const requestBody = mapper.map('StateUpdate', body, 'StateUpdateRequest')
    return this.post(`/${id}/set_state`, { state: requestBody.state, force: true })
  }

  public deleteTaskRun(taskRunId: string): Promise<void> {
    return this.delete(`/${taskRunId}`)
  }
}