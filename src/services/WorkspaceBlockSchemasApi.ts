import { mapper } from './Mapper'
import { WorkspaceApi } from './WorkspaceApi'
import { BlockSchemaResponse } from '@/models/api/BlockSchemaResponse'
import { BlockSchema } from '@/models/BlockSchema'
import { BlockSchemaFilter } from '@/models/BlockSchemaFilter'

export interface IWorkspaceBlockSchemasApi {
  getBlockSchema: (blockSchemaId: string) => Promise<BlockSchema>,
  getBlockSchemas: (filter: BlockSchemaFilter) => Promise<BlockSchema[]>,
  getBlockSchemaForBlockType: (blockTypeId: string) => Promise<BlockSchema>,
}

export class WorkspaceBlockSchemasApi extends WorkspaceApi implements IWorkspaceBlockSchemasApi {

  protected override routePrefix = '/block_schemas'

  public async getBlockSchema(blockSchemaId: string): Promise<BlockSchema> {
    const { data } = await this.get<BlockSchemaResponse>(`/${blockSchemaId}`)

    return mapper.map('BlockSchemaResponse', data, 'BlockSchema')
  }

  public async getBlockSchemas(filter: BlockSchemaFilter = {}): Promise<BlockSchema[]> {
    const { data } = await this.post<BlockSchemaResponse[]>('/filter', mapper.map('BlockSchemaFilter', filter, 'BlockSchemaFilterRequest'))

    return mapper.map('BlockSchemaResponse', data, 'BlockSchema')
  }

  public async getBlockSchemaForBlockType(blockTypeId: string): Promise<BlockSchema> {
    const filter = {
      blockSchemas: {
        blockTypeId: {
          any_: [blockTypeId],
        },
      },
    }

    const { data } = await this.post<BlockSchemaResponse[]>('/filter', mapper.map('BlockSchemaFilter', filter, 'BlockSchemaFilterRequest'))
    const [first] = data

    return mapper.map('BlockSchemaResponse', first, 'BlockSchema')
  }

}