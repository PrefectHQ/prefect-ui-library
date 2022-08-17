import { SchemaPropertiesResponse, SchemaPropertyResponse, SchemaResponse } from '@/models/api/SchemaResponse'
import { MapFunction } from '@/services/Mapper'
import { Schema, SchemaProperties, SchemaProperty } from '@/types/schemas'
import { getSchemaPropertyMeta } from '@/utilities/schemas'

export const mapSchemaResponseToSchema: MapFunction<SchemaResponse, Schema> = function(source: SchemaResponse): Schema {

  const resolveSchema = (schema: SchemaResponse): Schema => {
    const { properties, items, ...rest } = schema
    const response: Schema = { ...rest }

    if (properties) {
      response.properties = resolveProperties(properties, schema)
    }

    if (items) {
      response.items = resolveProperty(items, schema)
    }

    return response
  }

  const resolveProperties = (properties: SchemaPropertiesResponse | undefined, schema: SchemaResponse): SchemaProperties | undefined => {
    if (properties === undefined) {
      return undefined
    }

    return Object.keys(properties).reduce<SchemaProperties>((result, key) => {
      result[key] = resolveProperty(properties[key], schema, key)

      return result
    }, {})
  }

  const resolveProperty = (property: SchemaPropertyResponse, schema: SchemaResponse, key: string = ''): SchemaProperty => {
    const { $ref, properties, items, allOf, anyOf, ...rest } = property
    const response: SchemaProperty = { ...rest }
    const meta = getSchemaPropertyMeta(property, schema, key)

    if (meta) {
      response.meta = meta
    }

    if ($ref) {
      Object.assign(response, resolveDefinition($ref, schema))
    }

    if (properties) {
      response.properties = resolveProperties(properties, schema)
    }

    if (items) {
      response.items = resolveProperty(items, schema)
    }

    if (allOf) {
      response.allOf = allOf.map(_property => resolveProperty(_property, schema))
    }

    if (anyOf) {
      response.anyOf = anyOf.map(_property => resolveProperty(_property, schema))
    }

    return response
  }

  const resolveDefinition = (ref: string, schema: SchemaResponse): SchemaProperty => {
    const [, match = ''] = ref.match(/^(?:#\/definitions\/)(.*)/) ?? []
    const definition = schema.definitions?.[match] ?? {}

    return resolveSchema(definition)
  }

  return resolveSchema(source)
}
