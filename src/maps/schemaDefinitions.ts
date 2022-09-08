import { SchemaDefinitionsResponse } from '@/models'
import { MapFunction } from '@/services/Mapper'
import { SchemaDefinitions } from '@/types/schemas'

export const mapSchemaDefinitionsResponseToSchemaDefinitions: MapFunction<SchemaDefinitionsResponse, SchemaDefinitions> = function(source: SchemaDefinitionsResponse): SchemaDefinitions {
  const result: SchemaDefinitions = {}

  return Object.keys(source).reduce((result, key) => {
    const definition = source[key]!

    result[key] = this.map('SchemaResponse', definition, 'Schema')

    return result
  }, result)
}