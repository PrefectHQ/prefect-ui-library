import { CollectionFlow, CollectionFlowResponse } from '@/models'
import { Api, ApiRoute } from '@/services/Api'
import { mapper } from '@/services/Mapper'
import { mocker } from '@/services/Mocker'

export class CollectionsApi extends Api {

  protected override route: ApiRoute = '/collections'

  public getFlowCollection(): Promise<CollectionFlow[]> {
    return Promise.resolve(mocker.createMany('collectionFlow', 10))
    // return this.get<CollectionFlowResponse[]>('views/flow')
    //   .then(({ data }) => mapper.map('CollectionFlowResponse', data, 'CollectionFlow'))
  }
}

export const collectionsApi = new CollectionsApi()