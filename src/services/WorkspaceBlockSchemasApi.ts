import { BlockSchemaResponse } from '@/models/api/BlockSchemaResponse'
import { BlockSchema } from '@/models/BlockSchema'
import { BlockSchemasFilter } from '@/models/Filters'
import { mapper } from '@/services/Mapper'
import { WorkspaceApi } from '@/services/WorkspaceApi'

export class WorkspaceBlockSchemasApi extends WorkspaceApi {

  protected override routePrefix = '/block_schemas'

  public async getBlockSchema(blockSchemaId: string): Promise<BlockSchema> {
    const { data } = await this.get<BlockSchemaResponse>(`/${blockSchemaId}`)

    return mapper.map('BlockSchemaResponse', data, 'BlockSchema')
  }

  public async getBlockSchemas(filter: BlockSchemasFilter = {}): Promise<BlockSchema[]> {
    const request = mapper.map('BlockSchemasFilter', filter, 'BlockSchemasFilterRequest')
    const { data } = await this.post<BlockSchemaResponse[]>('/filter', request)

    return mapper.map('BlockSchemaResponse', data, 'BlockSchema')
  }

  public async getBlockSchemaForBlockType(blockTypeId: string): Promise<BlockSchema> {
    const filter: BlockSchemasFilter = {
      blockSchemas: {
        blockTypeId: [blockTypeId],
      },
    }

    const { data } = await this.post<BlockSchemaResponse[]>('/filter', mapper.map('BlockSchemasFilter', filter, 'BlockSchemasFilterRequest'))
    const [first] = data

    return mapper.map('BlockSchemaResponse', first, 'BlockSchema')
  }

}