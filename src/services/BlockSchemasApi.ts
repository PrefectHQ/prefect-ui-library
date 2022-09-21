import { InjectionKey } from 'vue'
import { Api, ApiRoute } from './Api'
import { mapper } from './Mapper'
import { BlockSchemaResponse } from '@/models/api/BlockSchemaResponse'
import { BlockSchema } from '@/models/BlockSchema'
import { BlockSchemaFilter } from '@/models/BlockSchemaFilter'

/**
 * @deprecated
 */
export class BlockSchemasApi extends Api {

  protected override route: ApiRoute = '/block_schemas'

  public getBlockSchema(blockSchemaId: string): Promise<BlockSchema> {
    return this.get<BlockSchemaResponse>(`/${blockSchemaId}`)
      .then(({ data }) => mapper.map('BlockSchemaResponse', data, 'BlockSchema'))
  }

  public getBlockSchemas(filter: BlockSchemaFilter = {}): Promise<BlockSchema[]> {
    return this.post<BlockSchemaResponse[]>('/filter', mapper.map('BlockSchemaFilter', filter, 'BlockSchemaFilterRequest'))
      .then(({ data }) => mapper.map('BlockSchemaResponse', data, 'BlockSchema'))
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

/**
 * @deprecated
 */
export const blockSchemasApiKey: InjectionKey<BlockSchemasApi> = Symbol('blockSchemasApiKey')