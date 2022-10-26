import { createActions } from '@prefecthq/vue-compositions'
import { MockedApi } from './MockedApi'
import { BlockDocument, BlockDocumentCreate, BlockDocumentFilter, BlockDocumentUpdate } from '@/models'
import { mocker } from '@/services'

export class BlockDocumentsApi extends MockedApi {
  public getBlockDocument(id: string): Promise<BlockDocument> {
    return this.promise(mocker.create('blockDocument', [{ id: id }]))
  }

  public getBlockDocuments(filter: BlockDocumentFilter = {}): Promise<BlockDocument[]> {
    return this.promise(mocker.createMany('blockDocument', mocker.create('number', [1, 10])))
  }

  public createBlockDocument(blockDocument: BlockDocumentCreate): Promise<BlockDocument> {
    return this.promise(mocker.create('blockDocument', [blockDocument]))
  }

  public updateBlockDocument(id: string, blockDocument: BlockDocumentUpdate): Promise<BlockDocument> {
    return this.promise(mocker.create('blockDocument', [blockDocument]))
  }

  public deleteBlockDocument(id: string): Promise<void> {
    return this.void()
  }
}

export const blockDocumentsApi = createActions(new BlockDocumentsApi())