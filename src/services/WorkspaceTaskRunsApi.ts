import { TaskRunResponse } from '@/models/api/TaskRunResponse'
import { TaskRunsFilter } from '@/models/Filters'
import { StateUpdate } from '@/models/StateUpdate'
import { TaskRun } from '@/models/TaskRun'
import { mapper } from '@/services/Mapper'
import { WorkspaceApi } from '@/services/WorkspaceApi'

export interface IWorkspaceTaskRunsApi {
  getTaskRun: (taskRunId: string) => Promise<TaskRun>,
  getTaskRuns: (filter: TaskRunsFilter) => Promise<TaskRun[]>,
  getTaskRunsCount: (filter: TaskRunsFilter) => Promise<number>,
  setTaskRunState: (taskRunId: string, body: StateUpdate) => Promise<void>,
  deleteTaskRun: (taskRunId: string) => Promise<void>,
}

export class WorkspaceTaskRunsApi extends WorkspaceApi implements IWorkspaceTaskRunsApi {

  protected routePrefix = '/task_runs'

  public async getTaskRun(id: string): Promise<TaskRun> {
    const { data } = await this.get<TaskRunResponse>(`/${id}`)

    return mapper.map('TaskRunResponse', data, 'TaskRun')
  }

  public async getTaskRuns(filter: TaskRunsFilter = {}): Promise<TaskRun[]> {
    const request = mapper.map('TaskRunsFilter', filter, 'TaskRunsFilterRequest')
    const { data } = await this.post<TaskRunResponse[]>('/filter', request)

    return mapper.map('TaskRunResponse', data, 'TaskRun')
  }

  public async getTaskRunsCount(filter: TaskRunsFilter = {}): Promise<number> {
    const request = mapper.map('TaskRunsFilter', filter, 'TaskRunsFilterRequest')
    const { data } = await this.post<number>('/count', request)

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