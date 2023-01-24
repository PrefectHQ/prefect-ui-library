import { MockApi } from './MockApi'
import { StateUpdate, TaskRun } from '@/models'
import { TaskRunsFilter } from '@/models/Filters'
import { IWorkspaceTaskRunsApi, mocker } from '@/services'

export class MockWorkspaceTaskRunsApi extends MockApi implements IWorkspaceTaskRunsApi {

  public async getTaskRun(taskRunId: string): Promise<TaskRun> {
    return await this.taskRuns.get(taskRunId)
  }

  public async getTaskRuns(filter: TaskRunsFilter = {}): Promise<TaskRun[]> {
    if (Object.keys(filter).length) {
      console.warn('MockWorkspaceTaskRunsApi has not implemented the filter argument of the getTaskRuns method')
    }

    return await this.taskRuns.getAll()
  }

  public async getTaskRunsCount(filter: TaskRunsFilter = {}): Promise<number> {
    if (Object.keys(filter).length) {
      console.warn('MockWorkspaceTaskRunsApi has not implemented the filter argument of the getTaskRuns method')
    }

    return await this.taskRuns.count()
  }

  public async setTaskRunState(taskRunId: string, body: StateUpdate): Promise<void> {
    const taskRun = this.taskRuns.get(taskRunId)
    taskRun.state = mocker.create('state', [body.state])
    taskRun.stateType = taskRun.state.type

    return await this.taskRuns.patch(taskRunId, taskRun)
  }

  public async deleteTaskRun(taskRunId: string): Promise<void> {
    return await this.taskRuns.delete(taskRunId)
  }

}