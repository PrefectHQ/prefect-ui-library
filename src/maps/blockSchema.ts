import { BlockSchemaResponse } from '@/models/api/BlockSchemaResponse'
import { BlockSchema } from '@/models/BlockSchema'
import { MapFunction } from '@/services/Mapper'

export const mapBlockSchemaResponseToBlockSchema: MapFunction<BlockSchemaResponse, BlockSchema> = function(source) {
  return new BlockSchema({
    id: source.id,
    checksum: source.checksum,
    blockTypeId: source.block_type_id,
    capabilities: source.capabilities,
    created: this.map('string', source.created, 'Date'),
    updated: this.map('string', source.updated, 'Date'),
    fields: this.map('SchemaResponse', source.fields, 'Schema'),
    blockType: this.map('BlockTypeResponse', source.block_type, 'BlockType'),
  })
}