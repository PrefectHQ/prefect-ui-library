import { BlockSchemaReferencesResponse } from '@/models/api/SchemaResponse'
import { MapFunction } from '@/services/Mapper'
import { BlockSchemaReferences } from '@/types/schemas'
import { mapValues } from '@/utilities'

export const mapBlockSchemaReferencesResponseToBlockSchemaReferences: MapFunction<BlockSchemaReferencesResponse, BlockSchemaReferences> = function(source) {
  return mapValues(source, (key, value) => ({
    blockSchemaChecksum: value!.block_schema_checksum,
    blockTypeSlug: value!.block_type_slug,
  }))
}