import { FlowRun, FlowRunResponse, WorkQueueCreate, WorkQueueEdit, WorkQueueResponse, WorkQueueStatus, WorkQueueStatusResponse } from '@/models'
import { WorkQueuesFilter } from '@/models/Filters'
import { WorkQueue } from '@/models/WorkQueue'
import { BatchProcessor } from '@/services/BatchProcessor'
import { mapper } from '@/services/Mapper'
import { WorkspaceApi } from '@/services/WorkspaceApi'
import { toMap } from '@/utilities'

export class WorkspaceWorkQueuesApi extends WorkspaceApi {

  protected override routePrefix = '/work_queues'

  private readonly isBatcher = new BatchProcessor<string, WorkQueue>(async ids => {
    if (ids.length === 1) {
      const [id] = ids
      const { data } = await this.get<WorkQueueResponse>(`/${id}`)

      return () => mapper.map('WorkQueueResponse', data, 'WorkQueue')
    }

    const workQueues = await this.getWorkQueues({
      workQueues: {
        id: ids,
      },
    })

    return toMap(workQueues, 'id')
  }, { maxBatchSize: 200 })

  private readonly nameBatcher = new BatchProcessor<string, WorkQueue>(async names => {
    if (names.length === 1) {
      const [name] = names
      const { data } = await this.get<WorkQueueResponse>(`/name/${name}`)

      return () => mapper.map('WorkQueueResponse', data, 'WorkQueue')
    }

    const workQueues = await this.getWorkQueues({
      workQueues: {
        name: names,
      },
    })

    return toMap(workQueues, 'id')
  }, { maxBatchSize: 200 })

  public getWorkQueue(workQueueId: string): Promise<WorkQueue> {
    return this.isBatcher.batch(workQueueId)
  }

  public getWorkQueueByName(workQueueName: string): Promise<WorkQueue> {
    return this.nameBatcher.batch(workQueueName)
  }

  public async getWorkQueues(filter: WorkQueuesFilter): Promise<WorkQueue[]> {
    const request = mapper.map('WorkQueuesFilter', filter, 'WorkQueuesFilterRequest')
    const { data } = await this.post<WorkQueueResponse[]>('/filter', request)

    return mapper.map('WorkQueueResponse', data, 'WorkQueue')
  }

  public async createWorkQueue(request: WorkQueueCreate): Promise<WorkQueue> {
    const body = mapper.map('WorkQueueCreate', request, 'WorkQueueCreateRequest')
    const { data } = await this.post<WorkQueueResponse>('/', body)

    return mapper.map('WorkQueueResponse', data, 'WorkQueue')
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

  public async getRuns(id: string): Promise<FlowRun[]> {
    const { data } = await this.post<FlowRunResponse[]>(`/${id}/get_runs`)

    return mapper.map('FlowRunResponse', data, 'FlowRun')
  }

  public async getWorkQueueStatus(id: string): Promise<WorkQueueStatus> {
    const { data } = await this.get<WorkQueueStatusResponse>(`/${id}/status`)

    return mapper.map('WorkQueueStatusResponse', data, 'WorkQueueStatus')
  }
}