import { InjectionKey } from 'vue'
import { FlowRun, FlowRunResponse, WorkQueueCreate, WorkQueueEdit, WorkQueueResponse } from '@/models'
import { WorkQueue } from '@/models/WorkQueue'
import { Api, ApiRoute } from '@/services/Api'
import { mapper } from '@/services/Mapper'
import { PaginatedFilter } from '@/types/UnionFilters'

export class WorkQueuesApi extends Api {

  protected route: ApiRoute = '/work_queues'

  public getWorkQueue(id: string): Promise<WorkQueue> {
    return this.get<WorkQueueResponse>(`/${id}`)
      .then(({ data }) => mapper.map('WorkQueueResponse', data, 'WorkQueue'))
  }

  public getWorkQueueByName(name: string): Promise<WorkQueue> {
    return this.get<WorkQueueResponse>(`/name/${name}`)
      .then(({ data }) => mapper.map('WorkQueueResponse', data, 'WorkQueue'))
  }

  public getWorkQueues(filter: PaginatedFilter): Promise<WorkQueue[]> {
    return this.post<WorkQueueResponse[]>('/filter', filter)
      .then(({ data }) => mapper.map('WorkQueueResponse', data, 'WorkQueue'))
  }

  public createWorkQueue(request: WorkQueueCreate): Promise<WorkQueue> {
    const body = mapper.map('WorkQueueCreate', request, 'WorkQueueCreateRequest')
    return this.post<WorkQueueResponse>('/', body)
      .then(({ data }) => mapper.map('WorkQueueResponse', data, 'WorkQueue'))
  }

  public pauseWorkQueue(id: string): Promise<void> {
    return this.patch(`/${id}`, { 'is_paused': true })
  }

  public resumeWorkQueue(id: string): Promise<void> {
    return this.patch(`/${id}`, { 'is_paused': false })
  }

  public updateWorkQueue(id: string, request: WorkQueueEdit): Promise<void> {
    const body = mapper.map('WorkQueueEdit', request, 'WorkQueueEditRequest')
    return this.patch(`/${id}`, body)
  }

  public deleteWorkQueue(id: string): Promise<void> {
    return this.delete(`/${id}`)
  }

  public getRuns(id: string): Promise<FlowRun[]> {
    return this.post<FlowRunResponse[]>(`/${id}/get_runs`)
      .then(({ data }) => mapper.map('FlowRunResponse', data, 'FlowRun'))
  }
}

export const workQueuesApiKey: InjectionKey<WorkQueuesApi> = Symbol('workQueuesApiKey')