import { BlockSchemaResponse } from '@/models/api/BlockSchemaResponse'
import { BlockSchema } from '@/models/BlockSchema'
import { MapFunction } from '@/services/Mapper'

export const mapBlockSchemaResponseToBlockSchema: MapFunction<BlockSchemaResponse, BlockSchema> = function(source: BlockSchemaResponse): BlockSchema {
  return new BlockSchema({
    id: source.id,
    created: this.map('string', source.created, 'Date'),
    updated: this.map('string', source.updated, 'Date'),
    checksum: source.checksum,
    fields: this.map('BlockSchemaFieldsResponse', source.fields, 'BlockSchemaFields'),
    blockTypeId: source.block_type_id,
    blockType: this.map('BlockTypeResponse', source.block_type, 'BlockType'),
    capabilities: source.capabilities,
  })
}