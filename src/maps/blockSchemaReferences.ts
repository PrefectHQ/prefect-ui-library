import { BlockSchemaReferencesResponse } from '@/models/api/BlockSchemaResponse'
import { MapFunction } from '@/services/Mapper'
import { BlockSchemaReferences } from '@/types/schemas'
import { mapSnakeToCamelCase } from '@/utilities'

export const mapBlockSchemaReferencesResponseToBlockSchemaReferences: MapFunction<BlockSchemaReferencesResponse, BlockSchemaReferences> = function(source: BlockSchemaReferencesResponse): BlockSchemaReferences {
  const references: BlockSchemaReferences = {}

  Object.entries(source).forEach(([key, value]) => {
    if (value !== undefined) {
      references[key] = mapSnakeToCamelCase(value)
    }
  })

  return references
}