import { createActions } from '@prefecthq/vue-compositions'
import { InjectionKey } from 'vue'
import { MockedApi } from './MockedApi'
import { TaskRun } from '@/models/TaskRun'
import { mocker } from '@/services'
import { UnionFilters } from '@/types/UnionFilters'

export class TaskRunsApi extends MockedApi {
  public getTaskRun(id: string): Promise<TaskRun> {
    return this.promise(mocker.create('taskRun', [{ id }]))
  }

  public getTaskRuns(filter: UnionFilters): Promise<TaskRun[]> {
    return this.promise(mocker.createMany('taskRun', 100))
  }

  public getTaskRunsCount(filter: UnionFilters): Promise<number> {
    return this.promise(mocker.create('number'))
  }

}

export const taskRunsApiKey: InjectionKey<TaskRunsApi> = Symbol('taskRunsApiKey')
export const taskRunsApi = createActions(new TaskRunsApi())