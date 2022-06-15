import { InjectionKey } from 'vue'
import { Api, ApiRoute } from './Api'
import { mapper } from './Mapper'
import { BlockDocumentResponse } from '@/models/api/BlockDocumentResponse'
import { BlockDocument } from '@/models/BlockDocument'
import { BlockDocumentCreate } from '@/models/BlockDocumentCreate'
import { BlockDocumentFilter } from '@/models/BlockDocumentFilter'
import { BlockDocumentUpdate } from '@/models/BlockDocumentUpdate'

export class BlockDocumentsApi extends Api {

  protected override route: ApiRoute = '/block_documents'

  public getBlockDocument(blockDocumentId: string): Promise<BlockDocument> {
    return this.get<BlockDocumentResponse>(`/${blockDocumentId}`)
      .then(({ data }) => mapper.map('BlockDocumentResponse', data, 'BlockDocument'))
  }

  public getBlockDocuments(filter: BlockDocumentFilter = {}): Promise<BlockDocument[]> {
    return this.post<BlockDocumentResponse[]>('/filter', mapper.map('BlockDocumentFilter', filter, 'BlockDocumentFilterRequest'))
      .then(({ data }) => mapper.map('BlockDocumentResponse', data, 'BlockDocument'))
  }

  public createBlockDocument(blockDocument: BlockDocumentCreate): Promise<BlockDocument> {
    return this.post<BlockDocumentResponse>('', mapper.map('BlockDocumentCreate', blockDocument, 'BlockDocumentCreateRequest'))
      .then(({ data }) => mapper.map('BlockDocumentResponse', data, 'BlockDocument'))
  }

  public updateBlockDocument(blockDocumentId: string, blockDocument: BlockDocumentUpdate): Promise<BlockDocument> {
    return this.patch<BlockDocumentResponse>(`/${blockDocumentId}`, mapper.map('BlockDocumentUpdate', blockDocument, 'BlockDocumentUpdateRequest'))
      .then(({ data }) => mapper.map('BlockDocumentResponse', data, 'BlockDocument'))
  }

  public deleteBlockDocument(blockDocumentId: string): Promise<void> {
    return this.delete(`/${blockDocumentId}`)
  }

}

export const blockDocumentsApiKey: InjectionKey<BlockDocumentsApi> = Symbol('blockDocumentsApiKey')