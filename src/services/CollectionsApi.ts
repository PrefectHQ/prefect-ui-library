import { CollectionItem, CollectionsResponse, WorkerCollectionResponse, WorkerCollectionWorker } from '@/models'
import { Api } from '@/services/Api'
import { mapper } from '@/services/Mapper'
import { isWorkerCollectionWorkerResponse } from '@/types/workers'

export interface ICollectionsApi {
  getFlowCollection: () => Promise<CollectionItem[]>,
  getWorkerCollectionWorkers: () => Promise<WorkerCollectionWorker[]>,
}

export class CollectionsApi extends Api implements ICollectionsApi {
  protected override routePrefix = '/collections'

  public getFlowCollection(): Promise<CollectionItem[]> {
    return this.get<CollectionsResponse>('/views/aggregate-flow-metadata')
      .then(({ data }) => mapper.map('CollectionResponse', data, 'CollectionItems'))
  }

  public async getWorkerCollectionWorkers(): Promise<WorkerCollectionWorker[]> {
    const { data } = await this.get<WorkerCollectionResponse>('/views/aggregate-worker-metadata')
    const workerCollectionWorkerResponse = Object.values(data)
      .flatMap((collection) => Object.values(collection))
      .filter(isWorkerCollectionWorkerResponse)

    return mapper.map('WorkerCollectionWorkerResponse', workerCollectionWorkerResponse, 'WorkerCollectionWorker')
  }
}