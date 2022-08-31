import { mapper } from './Mapper'
import { WorkspaceApi } from './WorkspaceApi'
import { BlockDocumentResponse } from '@/models/api/BlockDocumentResponse'
import { BlockDocument } from '@/models/BlockDocument'
import { BlockDocumentCreate } from '@/models/BlockDocumentCreate'
import { BlockDocumentFilter } from '@/models/BlockDocumentFilter'
import { BlockDocumentUpdate } from '@/models/BlockDocumentUpdate'

export class WorkspaceBlockDocumentsApi extends WorkspaceApi {

  protected override prefix = '/block_documents'

  public async getBlockDocument(blockDocumentId: string): Promise<BlockDocument> {
    const { data } = await this.get<BlockDocumentResponse>(`/${blockDocumentId}`)

    return mapper.map('BlockDocumentResponse', data, 'BlockDocument')
  }

  public async getBlockDocuments(filter: BlockDocumentFilter = {}): Promise<BlockDocument[]> {
    const { data } = await this.post<BlockDocumentResponse[]>('/filter', mapper.map('BlockDocumentFilter', filter, 'BlockDocumentFilterRequest'))

    return mapper.map('BlockDocumentResponse', data, 'BlockDocument')
  }

  public async createBlockDocument(blockDocument: BlockDocumentCreate): Promise<BlockDocument> {
    const { data } = await this.post<BlockDocumentResponse>('/', mapper.map('BlockDocumentCreate', blockDocument, 'BlockDocumentCreateRequest'))

    return mapper.map('BlockDocumentResponse', data, 'BlockDocument')
  }

  public updateBlockDocument(blockDocumentId: string, blockDocument: BlockDocumentUpdate): Promise<void> {
    return this.patch(`/${blockDocumentId}`, mapper.map('BlockDocumentUpdate', blockDocument, 'BlockDocumentUpdateRequest'))
  }

  public deleteBlockDocument(blockDocumentId: string): Promise<void> {
    return this.delete(`/${blockDocumentId}`)
  }

}