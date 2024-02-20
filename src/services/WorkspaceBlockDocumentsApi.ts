import { BlockDocumentResponse } from '@/models/api/BlockDocumentResponse'
import { BlockDocument } from '@/models/BlockDocument'
import { BlockDocumentCreate } from '@/models/BlockDocumentCreate'
import { BlockDocumentUpdate } from '@/models/BlockDocumentUpdate'
import { BlockDocumentsFilter } from '@/models/Filters'
import { BatchProcessor } from '@/services/BatchProcessor'
import { mapper } from '@/services/Mapper'
import { WorkspaceApi } from '@/services/WorkspaceApi'
import { toMap } from '@/utilities'

export class WorkspaceBlockDocumentsApi extends WorkspaceApi {

  protected override routePrefix = '/block_documents'

  private readonly batcher = new BatchProcessor<string, BlockDocument>(async ids => {
    if (ids.length === 1) {
      const [id] = ids
      return this.getSingleBlockDocument.bind(this, id)
    }

    const blockDocuments = await this.getBlockDocuments({
      blockDocuments: {
        id: ids,
        isAnonymous: null,
      },
    })

    return toMap(blockDocuments, 'id')
  }, { maxBatchSize: 200 })

  public getBlockDocument(blockDocumentId: string): Promise<BlockDocument> {
    return this.batcher.batch(blockDocumentId)
  }

  protected async getSingleBlockDocument(blockDocumentId: string): Promise<BlockDocument> {
    const { data } = await this.get<BlockDocumentResponse>(`/${blockDocumentId}`)

    return mapper.map('BlockDocumentResponse', data, 'BlockDocument')
  }

  public async getBlockDocuments(filter: BlockDocumentsFilter = {}): Promise<BlockDocument[]> {
    const request = mapper.map('BlockDocumentsFilter', filter, 'BlockDocumentsFilterRequest')
    const { data } = await this.post<BlockDocumentResponse[]>('/filter', request)

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

  public async getBlockDocumentsCount(filter: BlockDocumentsFilter = {}): Promise<number> {
    const request = mapper.map('BlockDocumentsFilter', filter, 'BlockDocumentsFilterRequest')
    const { data } = await this.post<number>('/count', request)

    return data
  }

}