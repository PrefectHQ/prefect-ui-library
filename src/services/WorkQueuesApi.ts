import { InjectionKey } from 'vue'
import { FlowRun, FlowRunResponse } from '@/models'
import { IWorkQueueRequest } from '@/models/IWorkQueueRequest'
import { IWorkQueueResponse } from '@/models/IWorkQueueResponse'
import { WorkQueue } from '@/models/WorkQueue'
import { Api, ApiRoute } from '@/services/Api'
import { mapper } from '@/services/Mapper'
import { PaginatedFilter } from '@/types/UnionFilters'

export class WorkQueuesApi extends Api {

  protected route: ApiRoute = '/work_queues'

  public getWorkQueue(id: string): Promise<WorkQueue> {
    return this.get<IWorkQueueResponse>(`/${id}`)
      .then(({ data }) => mapper.map('IWorkQueueResponse', data, 'WorkQueue'))
  }

  public getWorkQueues(filter: PaginatedFilter): Promise<WorkQueue[]> {
    return this.post<IWorkQueueResponse[]>('/filter', filter)
      .then(({ data }) => mapper.map('IWorkQueueResponse', data, 'WorkQueue'))
  }

  public createWorkQueue(request: IWorkQueueRequest): Promise<WorkQueue> {
    return this.post<IWorkQueueResponse>('/', request)
      .then(({ data }) => mapper.map('IWorkQueueResponse', data, 'WorkQueue'))
  }

  public pauseWorkQueue(id: string): Promise<void> {
    return this.patch(`/${id}`, { 'is_paused': true })
  }

  public resumeWorkQueue(id: string): Promise<void> {
    return this.patch(`/${id}`, { 'is_paused': false })
  }

  public updateWorkQueue(id: string, request: IWorkQueueRequest): Promise<void> {
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