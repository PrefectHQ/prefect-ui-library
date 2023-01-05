import { MockApi } from './MockApi'
import { BlockDocument, BlockDocumentFilter, BlockDocumentCreate, BlockDocumentUpdate } from '@/models'
import { mocker, IWorkspaceBlockDocumentsApi } from '@/services'

export class MockWorkspaceBlockDocumentsApi extends MockApi implements IWorkspaceBlockDocumentsApi {

  public async getBlockDocument(blockDocumentId: string): Promise<BlockDocument> {
    return await this.blockDocuments.get(blockDocumentId)
  }

  public async getBlockDocuments(filter: BlockDocumentFilter = {}): Promise<BlockDocument[]> {
    if (Object.keys(filter).length) {
      let blockDocuments = this.blockDocuments.getAll()

      const filterBlockTypeSlug = filter.blockTypes?.slug

      if (filterBlockTypeSlug) {
        blockDocuments = blockDocuments.filter(blockDocument => filterBlockTypeSlug.includes(blockDocument.blockType.slug))
      }

      const filterBlockTypeName = filter.blockTypes?.name

      if (filterBlockTypeName) {
        blockDocuments = blockDocuments.filter(blockDocument => blockDocument.name.includes(filterBlockTypeName))
      }

      return await blockDocuments
    }

    return await this.blockDocuments.getAll()
  }

  public async createBlockDocument(blockDocumentCreate: BlockDocumentCreate): Promise<BlockDocument> {
    const document = mocker.create('blockDocument', [blockDocumentCreate])

    this.blockDocuments.create(document)

    return await document
  }

  public async updateBlockDocument(blockDocumentId: string, blockDocument: BlockDocumentUpdate): Promise<void> {
    return await this.blockDocuments.patch(blockDocumentId, blockDocument)
  }

  public async deleteBlockDocument(blockDocumentId: string): Promise<void> {
    return await this.blockDocuments.delete(blockDocumentId)
  }

}
