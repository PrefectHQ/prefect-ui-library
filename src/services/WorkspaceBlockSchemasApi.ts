import { mapper } from './Mapper'
import { WorkspaceApi } from './WorkspaceApi'
import { BlockSchemaResponse } from '@/models/api/BlockSchemaResponse'
import { BlockSchema } from '@/models/BlockSchema'
import { BlockSchemaFilter } from '@/models/BlockSchemaFilter'

export class WorkspaceBlockSchemasApi extends WorkspaceApi {

  protected override routePrefix = '/block_schemas'

  public async getBlockSchema(blockSchemaId: string): Promise<BlockSchema> {
    const { data } = await this.get<BlockSchemaResponse>(`/${blockSchemaId}`)

    return mapper.map('BlockSchemaResponse', data, 'BlockSchema')
  }

  public async getBlockSchemas(filter: BlockSchemaFilter = {}): Promise<BlockSchema[]> {
    const { data } = await this.post<BlockSchemaResponse[]>('/filter', mapper.map('BlockSchemaFilter', filter, 'BlockSchemaFilterRequest'))

    return mapper.map('BlockSchemaResponse', data, 'BlockSchema')
  }

}