import { BlockDocumentReferencesResponse } from '@/models'
import { MapFunction } from '@/services/Mapper'
import { schemaValuesReferencesResolver } from '@/services/schemas/resolvers/references'
import { getSchemaResponseValue } from '@/services/schemas/utilities'
import { Schema, SchemaValues } from '@/types/schemas'

type MapSchemaValuesSource = {
  values: SchemaValues,
  schema: Schema,
  references?: BlockDocumentReferencesResponse,
}

export const mapSchemaValuesResponseToSchemaValues: MapFunction<MapSchemaValuesSource, SchemaValues> = function(source: MapSchemaValuesSource): SchemaValues {
  let resolved: SchemaValues = source.values

  if (source.references) {
    resolved = schemaValuesReferencesResolver(resolved, source.references)
  }

  resolved = getSchemaResponseValue(source.schema, resolved)

  return resolved
}
