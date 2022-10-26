import { DataStore } from './dataStore'
import { BlockSchema, BlockSchemaFilter, BlockSchemaResponse } from '@/models'
import { WorkspaceBlockSchemasApi, WorkspaceApiConfig, mapper } from '@/services'

export class MockWorkspaceBlockSchemasApi extends WorkspaceBlockSchemasApi {
  private readonly data: DataStore<BlockSchemaResponse>

  public constructor(config: WorkspaceApiConfig, seeds: BlockSchemaResponse[] = []) {
    super(config)

    this.data = new DataStore(seeds)
  }

  protected override routePrefix = '/block_schemas'

  public async getBlockSchema(blockSchemaId: string): Promise<BlockSchema> {
    const data = this.data.get(blockSchemaId)

    return await mapper.map('BlockSchemaResponse', data, 'BlockSchema')
  }

  public async getBlockSchemas(filter: BlockSchemaFilter = {}): Promise<BlockSchema[]> {
    const data = this.data.getAll()

    if (Object.keys(filter).length) {
      console.warn('MockWorkspaceBlockSchemasApi has not implemented the filter argument of the getBlockSchemas method')
    }

    return await mapper.map('BlockSchemaResponse', data, 'BlockSchema')
  }

  public async getBlockSchemaForBlockType(blockTypeId: string): Promise<BlockSchema> {
    const schema = this.data.find(schema => schema.block_type_id == blockTypeId)!

    return await mapper.map('BlockSchemaResponse', schema, 'BlockSchema')
  }

}
