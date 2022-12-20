import { WorkerPoolWorker } from '@/models'
import { WorkerPoolWorkerResponse } from '@/models/api/WorkerPoolWorkerResponse'
import { MapFunction } from '@/services/Mapper'
export const mapWorkerPoolWorkerResponseToWorkerPoolWorker: MapFunction<WorkerPoolWorkerResponse, WorkerPoolWorker> = function(source: WorkerPoolWorkerResponse): WorkerPoolWorker {
  return new WorkerPoolWorker({
    id: source.id,
    created: this.map('string', source.created, 'Date'),
    updated: this.map('string', source.updated, 'Date'),
    name: source.name,
    workerPoolId: source.worker_pool_id,
    lastHeartbeatTime: this.map('string', source.last_heartbeat_time, 'Date'),
  })
}