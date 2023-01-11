import { BlockSchemaResponse } from '@/models/api/BlockSchemaResponse'
import { BlockSchema } from '@/models/BlockSchema'
import { BlockSchemaFilter } from '@/models/BlockSchemaFilter'
import { mapper } from '@/services/Mapper'
import { WorkspaceApi } from '@/services/WorkspaceApi'

export interface IWorkspaceBlockSchemasApi {
  getBlockSchema: (blockSchemaId: string) => Promise<BlockSchema>,
  getBlockSchemas: (filter: BlockSchemasFilter) => Promise<BlockSchema[]>,
  getBlockSchemaForBlockType: (blockTypeId: string) => Promise<BlockSchema>,
}

export class WorkspaceBlockSchemasApi extends WorkspaceApi implements IWorkspaceBlockSchemasApi {

  protected override routePrefix = '/block_schemas'

  public async getBlockSchema(blockSchemaId: string): Promise<BlockSchema> {
    const { data } = await this.get<BlockSchemaResponse>(`/${blockSchemaId}`)

    return mapper.map('BlockSchemaResponse', data, 'BlockSchema')
  }

  public async getBlockSchemas(filter: BlockSchemasFilter = {}): Promise<BlockSchema[]> {
    const { data } = await this.post<BlockSchemaResponse[]>('/filter', mapper.map('BlockSchemasFilter', filter, 'BlockSchemasFilterRequest'))

    return mapper.map('BlockSchemaResponse', data, 'BlockSchema')
  }

  public async getBlockSchemaForBlockType(blockTypeId: string): Promise<BlockSchema> {
    const filter: BlockSchemasFilter = {
      blockSchemas: {
        blockTypeId,
      },
    }

    const { data } = await this.post<BlockSchemaResponse[]>('/filter', mapper.map('BlockSchemasFilter', filter, 'BlockSchemasFilterRequest'))
    const [first] = data

    return mapper.map('BlockSchemaResponse', first, 'BlockSchema')
  }

}