import { MockApi } from './MockApi'
import { BlockType, BlockTypeFilter, BlockDocument } from '@/models'
import { IWorkspaceBlockTypesApi } from '@/services'

export class MockWorkspaceBlockTypesApi extends MockApi implements IWorkspaceBlockTypesApi {

  public async getBlockType(blockTypeId: string): Promise<BlockType> {
    return await this.blockTypes.get(blockTypeId)
  }

  public async getBlockTypeBySlug(blockTypeSlug: string): Promise<BlockType> {
    return await this.blockTypes.find(blockType => blockType.slug === blockTypeSlug)!
  }

  public async getBlockTypes(filter: BlockTypeFilter = {}): Promise<BlockType[]> {
    if (Object.keys(filter).length) {
      console.warn('MockWorkspaceBlockTypesApi has not implemented the filter argument of the getBlockTypes method')
    }

    return await this.blockTypes.getAll()

  }

  public async getBlockDocumentsByBlockTypeSlug(blockTypeSlug: string): Promise<BlockDocument[]> {
    return await this.blockDocuments.findAll(blockDocument => blockDocument.blockType.slug === blockTypeSlug)
  }

}