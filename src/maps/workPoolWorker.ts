import { WorkPoolWorker } from '@/models'
import { WorkPoolWorkerResponse } from '@/models/api/WorkPoolWorkerResponse'
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