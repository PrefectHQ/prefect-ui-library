import { SchemaPropertiesResponse, SchemaPropertyResponse, SchemaResponse } from '@/models/api/SchemaResponse'
import { MapFunction } from '@/services/Mapper'
import { Schema, SchemaProperties, SchemaProperty } from '@/types/schemas'
import { getSchemaPropertyMeta, INITIAL_PROPERTY_LEVEL } from '@/utilities/schemas'

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

  const resolveProperties = (properties: SchemaPropertiesResponse | undefined, schema: SchemaResponse, level: number = INITIAL_PROPERTY_LEVEL): SchemaProperties | undefined => {
    if (properties === undefined) {
      return undefined
    }

    return Object.keys(properties).reduce<SchemaProperties>((result, key) => {
      result[key] = resolveProperty(properties[key], schema, key, level + 1)

      return result
    }, {})
  }

  // eslint-disable-next-line max-params
  const resolveProperty = (property: SchemaPropertyResponse, schema: SchemaResponse, key: string = '', level: number = INITIAL_PROPERTY_LEVEL): SchemaProperty => {
    const { $ref, properties, items, allOf, anyOf, ...rest } = property
    const response: SchemaProperty = { ...rest }

    if ($ref) {
      Object.assign(response, resolveDefinition($ref, schema))
    }

    if (properties) {
      response.properties = resolveProperties(properties, property, level)
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

    const meta = getSchemaPropertyMeta({ property, schema, key, level })

    if (meta) {
      response.meta = meta
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
