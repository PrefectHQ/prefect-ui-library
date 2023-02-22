import { CollectionItem, CollectionItemResponse, PrefectWorkerCollectionResponse, WorkerCollectionItem, WorkerCollectionItemResponse } from '@/models'
import { Api } from '@/services/Api'
import { mapper } from '@/services/Mapper'

export class CollectionsApi extends Api {
  protected override routePrefix = '/collections'

  public getFlowCollection(): Promise<CollectionItem[]> {
    return this.get<CollectionItemResponse[]>('/views/aggregate-flow-metadata')
      .then(({ data }) => mapper.map('CollectionItemResponse', data, 'CollectionItem'))
  }

  public getWorkerCollection(): Promise<WorkerCollectionItem[]> {
    return this.get<PrefectWorkerCollectionResponse>('/views/aggregate-worker-metadata')
      .then(({ data }) => mapper.map('PrefectWorkerCollectionResponse', data, 'WorkerCollectionItem'))
  }
}