import { CollectionItem } from '@/models/CollectionItem'
import { WorkerCollectionItem } from '@/models/WorkerCollectionItem'
import { ICollectionsApi } from '@/services/CollectionsApi'

export class MockCollectionsApi implements ICollectionsApi {

  public getFlowCollection(): Promise<CollectionItem[]> {
    throw new Error('Not Implemented')
  }

  public getWorkerCollection(): Promise<WorkerCollectionItem[]> {
    throw new Error('Not Implemented')
  }

}