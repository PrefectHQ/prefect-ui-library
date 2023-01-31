import { BlockDocumentReferencesResponse } from '@/models'
import { MapFunction } from '@/services/Mapper'
import { schemaValuesBlockReferencesResolver } from '@/services/schemas/resolvers/blockReferences'
import { getSchemaResponseValue } from '@/services/schemas/utilities'
import { Schema, SchemaValues } from '@/types/schemas'

type MapSchemaValuesSource = {
  values: SchemaValues,
  schema: Schema,
  references?: BlockDocumentReferencesResponse,
}

export const mapSchemaValuesResponseToSchemaValues: MapFunction<MapSchemaValuesSource, SchemaValues> = function(source) {
  let resolved: SchemaValues = source.values

  if (source.references) {
    resolved = schemaValuesBlockReferencesResolver(resolved, source.references)
  }

  resolved = getSchemaResponseValue(source.schema, resolved)

  return resolved
}
