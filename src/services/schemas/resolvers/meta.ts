import { markRaw } from 'vue'
import { schemaPropertyServiceFactory } from '@/services/schemas/properties'
import { SchemaResolver } from '@/services/schemas/resolvers/schemas'
import { Schema, SchemaProperties, SchemaProperty } from '@/types/schemas'
import { mapValues } from '@/utilities'

export const schemaMetaResolver: SchemaResolver = (schema: Schema): Schema => {
  return resolveSchemaPropertyMeta(schema, false, 0)
}

type PropertiesSource = Pick<SchemaProperty, 'properties' | 'required'>

function resolveSchemaPropertiesMeta({ required, properties }: PropertiesSource, level: number): SchemaProperties {
  return mapValues(properties ?? {}, (key, property) => {
    const propertyIsRequired = required?.includes(key) ?? false

    return resolveSchemaPropertyMeta(property!, propertyIsRequired, level)
  })
}

function resolveSchemaPropertyMeta(property: SchemaProperty, required: boolean, level: number): SchemaProperty {
  const { properties, allOf, anyOf, items, ...rest } = property
  const resolved: SchemaProperty = rest

  if (allOf) {
    resolved.allOf = allOf.map(value => resolveSchemaPropertyMeta(value, required, level))
  }

  if (anyOf) {
    resolved.anyOf = anyOf.map(value => resolveSchemaPropertyMeta(value, required, level))
  }

  if (items) {
    resolved.items = resolveSchemaPropertyMeta(items, false, level)
  }

  if (properties) {
    resolved.properties = resolveSchemaPropertiesMeta(property, level + 1)
  }

  const service = schemaPropertyServiceFactory(property, level)
  const meta = service.getMeta(required)

  if (meta) {
    // marking this as raw is important because we don't want to add reactivity to a component instance
    resolved.meta = markRaw(meta)
  }

  return resolved
}