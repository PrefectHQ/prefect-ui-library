import { MapFunction } from '@/services/Mapper'
import { getSchemaRequestValue } from '@/services/schemas'
import { Schema, SchemaValues } from '@/types/schemas'

type MapSchemaValuesSource = {
  values: SchemaValues,
  schema: Schema,
}

export const mapSchemaValuesToSchemaValuesRequest: MapFunction<MapSchemaValuesSource, SchemaValues> = function(source) {
  return getSchemaRequestValue(source.schema, source.values)
}
