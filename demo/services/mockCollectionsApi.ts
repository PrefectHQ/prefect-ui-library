import { WorkerCollectionWorker } from '@/models'
import { CollectionItem } from '@/models/CollectionItem'
import { ICollectionsApi } from '@/services/CollectionsApi'

export class MockCollectionsApi implements ICollectionsApi {

  public getFlowCollection(): Promise<CollectionItem[]> {
    throw new Error('Not Implemented')
  }

  public getWorkerCollectionWorkers(): Promise<WorkerCollectionWorker[]> {
    throw new Error('Not Implemented')
  }

}