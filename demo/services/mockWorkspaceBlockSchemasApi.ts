import { MockApi } from './MockApi'
import { BlockSchema } from '@/models'
import { BlockSchemasFilter } from '@/models/Filters'
import { IWorkspaceBlockSchemasApi } from '@/services'

export class MockWorkspaceBlockSchemasApi extends MockApi implements IWorkspaceBlockSchemasApi {

  public async getBlockSchema(blockSchemaId: string): Promise<BlockSchema> {
    return await this.blockSchemas.get(blockSchemaId)
  }

  public async getBlockSchemas(filter: BlockSchemasFilter = {}): Promise<BlockSchema[]> {
    if (Object.keys(filter).length) {
      console.warn('MockWorkspaceBlockSchemasApi has not implemented the filter argument of the getBlockSchemas method')
    }

    return await this.blockSchemas.getAll()
  }

  public async getBlockSchemaForBlockType(blockTypeId: string): Promise<BlockSchema> {
    return await this.blockSchemas.find(schema => schema.blockTypeId == blockTypeId)!
  }

}
