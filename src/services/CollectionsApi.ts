import { CollectionItem, CollectionItemResponse } from '@/models'
import { Api, ApiRoute } from '@/services/Api'
import { mapper } from '@/services/Mapper'

export class CollectionsApi extends Api {

  protected override route: ApiRoute = '/collections'

  public getFlowCollection(): Promise<CollectionItem[]> {
    return this.get<CollectionItemResponse[]>('views/aggregate-flow-metadata')
      .then(({ data }) => mapper.map('CollectionItemResponse', data, 'CollectionItem'))
  }
}

export const collectionsApi = new CollectionsApi()