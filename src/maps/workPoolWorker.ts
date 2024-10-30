import { PaginatedWorkPoolWorkers, WorkPoolWorker } from '@/models'
import { WorkPoolWorkerPaginationResponse, WorkPoolWorkerResponse } from '@/models/api/WorkPoolWorkerResponse'
import { MapFunction } from '@/services/Mapper'

export const mapWorkPoolWorkerResponseToWorkPoolWorker: MapFunction<WorkPoolWorkerResponse, WorkPoolWorker> = function(source) {
  return new WorkPoolWorker({
    id: source.id,
    created: this.map('string', source.created, 'Date'),
    updated: this.map('string', source.updated, 'Date'),
    name: source.name,
    workPoolId: source.work_pool_id,
    lastHeartbeatTime: this.map('string', source.last_heartbeat_time, 'Date'),
    status: this.map('ServerWorkPoolWorkerStatus', source.status, 'WorkPoolWorkerStatus'),
  })
}

export const mapWorkPoolWorkerPaginationResponseToPaginatedWorkPoolWorkers: MapFunction<WorkPoolWorkerPaginationResponse, PaginatedWorkPoolWorkers> = function(source) {
  return {
    workers: source.results.map((item: WorkPoolWorkerResponse) => this.map('WorkPoolWorkerResponse', item, 'WorkPoolWorker')),
    count: source.count,
    limit: source.limit,
    page: source.page,
    pages: source.pages,
  }
}
