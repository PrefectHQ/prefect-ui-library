import { BlockSchemaReferencesResponse } from '@/models/api/SchemaResponse'
import { MapFunction } from '@/services/Mapper'
import { BlockSchemaReferences } from '@/types/schemas'
import { mapEntries, mapSnakeToCamelCase } from '@/utilities'

export const mapBlockSchemaReferencesResponseToBlockSchemaReferences: MapFunction<BlockSchemaReferencesResponse, BlockSchemaReferences> = function(source: BlockSchemaReferencesResponse): BlockSchemaReferences {
  return mapEntries(source, (key, value) => mapSnakeToCamelCase({ ...value! }))
}