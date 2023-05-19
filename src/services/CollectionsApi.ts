import { CollectionItem, CollectionsResponse, PrefectWorkerCollectionResponse, WorkerCollectionItem } from '@/models'
import { Api } from '@/services/Api'
import { mapper } from '@/services/Mapper'

export interface ICollectionsApi {
  getFlowCollection: () => Promise<CollectionItem[]>,
  getWorkerCollection: () => Promise<WorkerCollectionItem[]>,
}

export class CollectionsApi extends Api implements ICollectionsApi {
  protected override routePrefix = '/collections'

  public getFlowCollection(): Promise<CollectionItem[]> {
    return this.get<CollectionsResponse>('/views/aggregate-flow-metadata')
      .then(({ data }) => mapper.map('CollectionResponse', data, 'CollectionItems'))
  }

  public getWorkerCollection(): Promise<WorkerCollectionItem[]> {
    return this.get<PrefectWorkerCollectionResponse>('/views/aggregate-worker-metadata')
      .then(({ data }) => mapper.map('PrefectWorkerCollectionResponse', data, 'WorkerCollectionItem'))
  }
}