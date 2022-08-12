import { SchemaPropertiesResponse, SchemaPropertyResponse, SchemaResponse } from '@/models/api/SchemaResponse'
import { MapFunction } from '@/services/Mapper'
import { Schema, SchemaProperties, SchemaProperty } from '@/types/schemas'

export const mapSchemaResponseToSchema: MapFunction<SchemaResponse, Schema> = function(source: SchemaResponse): Schema {
  return resolveSchema(source)
}

function resolveSchema(schema: SchemaResponse): Schema {
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

function resolveProperties(properties: SchemaPropertiesResponse | undefined, schema: SchemaResponse): SchemaProperties | undefined {
  if (properties === undefined) {
    return undefined
  }

  return Object.keys(properties).reduce<SchemaProperties>((result, key) => {
    result[key] = resolveProperty(properties[key]!, schema, key)

    return result
  }, {})
}

function resolveProperty(property: SchemaPropertyResponse, schema: SchemaResponse, key: string = ''): SchemaProperty {
  const { $ref, properties, items, allOf, anyOf, required, ...rest } = property
  const response: SchemaProperty = { ...rest }

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

  // this logic is incorrect and will be replaced by property meta in a future pr
  // start
  const isRequired = schema.required?.includes(key)

  if (required) {
    response.required = isRequired ? [...required, key] : required
  } else if (isRequired) {
    response.required = [key]
  }
  // end

  return response
}

function resolveDefinition(ref: string, schema: SchemaResponse): SchemaProperty {
  const [, match = ''] = ref.match(/^(?:#\/definitions\/)(.*)/) ?? []
  const definition = schema.definitions?.[match] ?? {}

  return resolveSchema(definition)
}