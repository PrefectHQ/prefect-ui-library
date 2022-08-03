import { InjectionKey } from 'vue'
import { FlowRun, FlowRunResponse } from '@/models'
import { WorkQueue } from '@/models/WorkQueue'
import { WorkQueueRequest } from '@/models/WorkQueueRequest'
import { WorkQueueResponse } from '@/models/WorkQueueResponse'
import { Api, ApiRoute } from '@/services/Api'
import { mapper } from '@/services/Mapper'
import { PaginatedFilter } from '@/types/UnionFilters'

export class WorkQueuesApi extends Api {

  protected route: ApiRoute = '/work_queues'

  public getWorkQueue(id: string): Promise<WorkQueue> {
    return this.get<WorkQueueResponse>(`/${id}`)
      .then(({ data }) => mapper.map('WorkQueueResponse', data, 'WorkQueue'))
  }

  public getWorkQueues(filter: PaginatedFilter): Promise<WorkQueue[]> {
    return this.post<WorkQueueResponse[]>('/filter', filter)
      .then(({ data }) => mapper.map('WorkQueueResponse', data, 'WorkQueue'))
  }

  public createWorkQueue(request: WorkQueueRequest): Promise<WorkQueue> {
    return this.post<WorkQueueResponse>('/', request)
      .then(({ data }) => mapper.map('WorkQueueResponse', data, 'WorkQueue'))
  }

  public pauseWorkQueue(id: string): Promise<void> {
    return this.patch(`/${id}`, { 'is_paused': true })
  }

  public resumeWorkQueue(id: string): Promise<void> {
    return this.patch(`/${id}`, { 'is_paused': false })
  }

  public updateWorkQueue(id: string, request: WorkQueueRequest): Promise<void> {
    return this.patch(`/${id}`, request)
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