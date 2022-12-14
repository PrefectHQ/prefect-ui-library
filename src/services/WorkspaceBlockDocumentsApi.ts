import { mapper } from './Mapper'
import { WorkspaceApi } from './WorkspaceApi'
import { BlockDocumentResponse } from '@/models/api/BlockDocumentResponse'
import { BlockDocument } from '@/models/BlockDocument'
import { BlockDocumentCreate } from '@/models/BlockDocumentCreate'
import { BlockDocumentUpdate } from '@/models/BlockDocumentUpdate'
import { BlockDocumentsFilter } from '@/models/Filters'

export interface IWorkspaceBlockDocumentsApi {
  getBlockDocument: (blockDocumentId: string) => Promise<BlockDocument>,
  getBlockDocuments: (filter: BlockDocumentsFilter) => Promise<BlockDocument[]>,
  createBlockDocument: (blockDocument: BlockDocumentCreate) => Promise<BlockDocument>,
  updateBlockDocument: (blockDocumentId: string, blockDocument: BlockDocumentUpdate) => Promise<void>,
  deleteBlockDocument: (blockDocumentId: string) => Promise<void>,
}

export class WorkspaceBlockDocumentsApi extends WorkspaceApi implements IWorkspaceBlockDocumentsApi {

  protected override routePrefix = '/block_documents'

  public async getBlockDocument(blockDocumentId: string): Promise<BlockDocument> {
    const { data } = await this.get<BlockDocumentResponse>(`/${blockDocumentId}`)

    return mapper.map('BlockDocumentResponse', data, 'BlockDocument')
  }

  public async getBlockDocuments(filter: BlockDocumentsFilter = {}): Promise<BlockDocument[]> {
    const { data } = await this.post<BlockDocumentResponse[]>('/filter', mapper.map('BlockDocumentsFilter', filter, 'BlockDocumentsFilterRequest'))

    return mapper.map('BlockDocumentResponse', data, 'BlockDocument')
  }

  public async createBlockDocument(blockDocument: BlockDocumentCreate): Promise<BlockDocument> {
    const { data } = await this.post<BlockDocumentResponse>('/', mapper.map('BlockDocumentCreate', blockDocument, 'BlockDocumentCreateRequest'))

    return mapper.map('BlockDocumentResponse', data, 'BlockDocument')
  }

  public updateBlockDocument(blockDocumentId: string, blockDocument: BlockDocumentUpdate): Promise<void> {
    const request = mapper.map('BlockDocumentUpdate', { mergeExistingData: false, ...blockDocument }, 'BlockDocumentUpdateRequest')

    return this.patch(`/${blockDocumentId}`, request)
  }

  public deleteBlockDocument(blockDocumentId: string): Promise<void> {
    return this.delete(`/${blockDocumentId}`)
  }

}