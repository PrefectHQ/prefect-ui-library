import { MockApi } from './MockApi'
import { TaskRun } from '@/models'
import { IWorkspaceTaskRunsApi } from '@/services'
import { UnionFilters } from '@/types'

export class MockWorkspaceTaskRunsApi extends MockApi implements IWorkspaceTaskRunsApi {

  public async getTaskRun(taskRunId: string): Promise<TaskRun> {
    return await this.taskRuns.get(taskRunId)
  }

  public async getTaskRuns(filter: UnionFilters = {}): Promise<TaskRun[]> {
    if (Object.keys(filter).length) {
      console.warn('MockWorkspaceTaskRunsApi has not implemented the filter argument of the getTaskRuns method')
    }

    return await this.taskRuns.getAll()
  }

  public async getTaskRunsCount(filter: UnionFilters = {}): Promise<number> {
    if (Object.keys(filter).length) {
      console.warn('MockWorkspaceTaskRunsApi has not implemented the filter argument of the getTaskRuns method')
    }

    return await this.taskRuns.count()
  }

  public async deleteTaskRun(taskRunId: string): Promise<void> {
    return await this.taskRuns.delete(taskRunId)
  }

}