import { TaskWorker, TaskWorkerResponse } from '@/models'
import { TaskWorkerFilter } from '@/models/Filters'
import { mapper } from '@/services/Mapper'
import { WorkspaceApi } from '@/services/WorkspaceApi'

export class WorkspaceTaskWorkersApi extends WorkspaceApi {

  protected override routePrefix = '/task_workers'

  public async getTaskWorkers(filter: TaskWorkerFilter = {}): Promise<TaskWorker[]> {
    const request = mapper.map('TaskWorkerFilter', filter, 'TaskWorkerFilterRequest')
    const { data } = await this.post<TaskWorkerResponse[]>('filter', request)
    return mapper.map('TaskWorkerResponse', data, 'TaskWorker')
  }
}