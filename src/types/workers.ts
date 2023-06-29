import { WorkerCollectionWorkerApiResponse, WorkerCollectionWorkerResponse } from '@/models'

export function isWorkerCollectionWorkerResponse(value: WorkerCollectionWorkerApiResponse): value is WorkerCollectionWorkerResponse {
  return value.type !== undefined && value.default_base_job_configuration !== undefined
}