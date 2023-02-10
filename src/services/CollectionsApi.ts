import { CollectionItem, CollectionItemResponse } from '@/models'
import { Api, ApiRoute } from '@/services/Api'
import { mapper } from '@/services/Mapper'
import { mocker } from '@/services/Mocker'

export class CollectionsApi extends Api {

  protected override route: ApiRoute = '/collections'

  public getFlowCollection(): Promise<CollectionItem[]> {
    return Promise.resolve(mocker.createMany('collectionItem', 10))
    // return this.get<CollectionItemResponse[]>('views/flow')
    //   .then(({ data }) => mapper.map('CollectionItemResponse', data, 'CollectionItem'))
  }
}

export const collectionsApi = new CollectionsApi()