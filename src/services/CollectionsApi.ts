import { CollectionItem, CollectionItemResponse } from '@/models'
import { BaseApi } from '@/services/BaseApi'
import { mapper } from '@/services/Mapper'

export class CollectionsApi extends BaseApi {
  protected override routePrefix = '/collections'

  public getFlowCollection(): Promise<CollectionItem[]> {
    return this.get<CollectionItemResponse[]>('/views/aggregate-flow-metadata')
      .then(({ data }) => mapper.map('CollectionItemResponse', data, 'CollectionItem'))
  }
}