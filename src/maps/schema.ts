import { SchemaPropertiesResponse, SchemaPropertyResponse, SchemaResponse } from '@/models/api/SchemaResponse'
import { MapFunction, mapper } from '@/services/Mapper'
import { BlockSchemaReference, BlockSchemaReferences, Schema, SchemaDefinitions, SchemaProperties, SchemaProperty } from '@/types/schemas'
import { getSchemaPropertyMeta, INITIAL_PROPERTY_LEVEL } from '@/utilities/schemas'

export const mapSchemaResponseToSchema: MapFunction<SchemaResponse, Schema> = function(source: SchemaResponse): Schema {
  const resolver = new SchemaResolver(source, this)

  return resolver.resolved
}

class SchemaResolver {
  private readonly definitions: SchemaDefinitions | undefined
  private readonly references: BlockSchemaReferences | undefined
  private readonly mapper: typeof mapper
  private readonly _resolved: Schema

  public constructor(schema: SchemaResponse, map: typeof mapper) {
    this.mapper = map
    this.definitions = schema.definitions
    this.references = this.mapper.map('BlockSchemaReferencesResponse', schema.block_schema_references, 'BlockSchemaReferences')

    this._resolved = this.resolveSchema(schema)
  }

  public get resolved(): Schema {
    return this._resolved
  }

  private resolveSchema(schema: Schema): Schema {
    const { properties, items, ...rest } = schema
    const response: Schema = rest

    if (properties) {
      response.properties = this.resolveProperties(properties, schema)
    }

    if (items) {
      response.items = this.resolveProperty(items, schema)
    }

    return response
  }

  private resolveProperties(properties: SchemaPropertiesResponse | undefined, schema: Schema, level: number = INITIAL_PROPERTY_LEVEL): SchemaProperties | undefined {
    if (properties === undefined) {
      return undefined
    }

    return Object.keys(properties).reduce<SchemaProperties>((result, key) => {
      result[key] = this.resolveProperty(properties[key], schema, key, level + 1)

      return result
    }, {})
  }

  // eslint-disable-next-line max-params
  private resolveProperty(property: SchemaPropertyResponse, schema: Schema, key: string = '', level: number = INITIAL_PROPERTY_LEVEL): SchemaProperty {
    const { $ref, properties, items, allOf, anyOf, ...rest } = property
    const response: SchemaProperty = { ...rest }

    if ($ref) {
      Object.assign(response, this.resolveDefinition($ref))
    }

    if (properties) {
      response.properties = this.resolveProperties(properties, property, level)
    }

    if (items) {
      response.items = this.resolveProperty(items, schema)
    }

    if (allOf) {
      response.allOf = allOf.map(_property => this.resolveProperty(_property, schema))
    }

    if (anyOf) {
      response.anyOf = anyOf.map(_property => this.resolveProperty(_property, schema))
    }

    response.blockReference = this.resolveBlockReference(key)

    const meta = getSchemaPropertyMeta({ property: response, schema, key, level })

    if (meta) {
      response.meta = meta
    }

    return response
  }

  private resolveDefinition(ref: string): SchemaProperty {
    const [, match = ''] = ref.match(/^(?:#\/definitions\/)(.*)/) ?? []
    const definition = this.definitions?.[match] ?? {}

    return this.resolveSchema(definition)
  }

  private resolveBlockReference(key: string): BlockSchemaReference | undefined {
    return this.references?.[key]
  }
}