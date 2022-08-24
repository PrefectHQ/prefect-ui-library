import { InjectionKey } from 'vue'
import { TaskRun } from '@/models/TaskRun'
import { TaskRunResponse } from '@/models/TaskRunResponse'
import { Api, ApiRoute } from '@/services/Api'
import { mapper } from '@/services/Mapper'
import { UnionFilters } from '@/types/UnionFilters'

export class TaskRunsApi extends Api {

  protected route: ApiRoute = '/task_runs'

  public getTaskRun(id: string): Promise<TaskRun> {
    return this.get<TaskRunResponse>(`/${id}`)
      .then(({ data }) => mapper.map('TaskRunResponse', data, 'TaskRun'))
  }

  public getTaskRuns(filter: UnionFilters): Promise<TaskRun[]> {
    return this.post<TaskRunResponse[]>('/filter', filter)
      .then(({ data }) => mapper.map('TaskRunResponse', data, 'TaskRun'))
  }

  public getTaskRunsCount(filter: UnionFilters): Promise<number> {
    return this.post<number>('/count', filter).then(({ data }) => data)
  }

  public deleteTaskRun(taskRunId: string): Promise<void> {
    return this.delete(`/${taskRunId}`)
  }
}

export const taskRunsApiKey: InjectionKey<TaskRunsApi> = Symbol('taskRunsApiKey')