import { DataStore } from './dataStore'
import { BlockDocumentResponse, BlockDocument, BlockDocumentFilter, BlockDocumentCreate, BlockDocumentUpdate } from '@/models'
import { WorkspaceBlockDocumentsApi, WorkspaceApiConfig, mapper, mocker } from '@/services'

export class MockWorkspaceBlockDocumentsApi extends WorkspaceBlockDocumentsApi {
  private readonly data: DataStore<BlockDocumentResponse>

  public constructor(config: WorkspaceApiConfig, seeds: BlockDocumentResponse[] = []) {
    super(config)

    this.data = new DataStore(seeds)
  }

  public async getBlockDocument(blockDocumentId: string): Promise<BlockDocument> {
    const data = this.data.get(blockDocumentId)

    return await mapper.map('BlockDocumentResponse', data, 'BlockDocument')
  }

  public async getBlockDocuments(filter: BlockDocumentFilter = {}): Promise<BlockDocument[]> {
    const data = this.data.getAll()

    if (Object.keys(filter).length) {
      console.warn('MockWorkspaceBlockDocumentsApi has not implemented the filter argument of the getBlockDocuments method')
    }

    return await mapper.map('BlockDocumentResponse', data, 'BlockDocument')
  }

  public async createBlockDocument(blockDocument: BlockDocumentCreate): Promise<BlockDocument> {
    const request = mapper.map('BlockDocumentCreate', blockDocument, 'BlockDocumentCreateRequest')
    const document = mocker.create('blockDocumentResponse', [request])

    this.data.create(document)

    return await mapper.map('BlockDocumentResponse', document, 'BlockDocument')
  }

  public async updateBlockDocument(blockDocumentId: string, blockDocument: BlockDocumentUpdate): Promise<void> {
    return await this.data.patch(blockDocumentId, blockDocument)
  }

  public async deleteBlockDocument(blockDocumentId: string): Promise<void> {
    return await this.data.delete(blockDocumentId)
  }

}
