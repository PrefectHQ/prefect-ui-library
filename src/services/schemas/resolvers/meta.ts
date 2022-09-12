import { markRaw } from 'vue'
import { schemaPropertyServiceFactory } from '../properties'
import { getSchemaPropertyAttrs, getSchemaPropertyValidators } from '../utilities'
import { SchemaResolver } from './schemas'
import { Schema, SchemaProperties, SchemaProperty } from '@/types/schemas'
import { mapEntries } from '@/utilities'

export const schemaMetaResolver: SchemaResolver = (schema: Schema): Schema => {
  return resolveSchemaPropertyMeta(schema, false, 0)
}

type PropertiesSource = Pick<SchemaProperty, 'properties' | 'required'>

function resolveSchemaPropertiesMeta({ required = [], properties = {} }: PropertiesSource, level: number): SchemaProperties {
  return mapEntries(properties, (key, property) => {
    const propertyIsRequired = required.includes(key)

    return resolveSchemaPropertyMeta(property!, propertyIsRequired, level)
  })
}

function resolveSchemaPropertyMeta(property: SchemaProperty, required: boolean, level: number): SchemaProperty {
  const { properties, allOf, anyOf, items, ...rest } = property
  const resolved: SchemaProperty = rest

  if (allOf) {
    resolved.allOf = allOf.map(value => resolveSchemaPropertyMeta(value, false, level))
  }

  if (anyOf) {
    resolved.anyOf = anyOf.map(value => resolveSchemaPropertyMeta(value, false, level))
  }

  if (items) {
    resolved.items = resolveSchemaPropertyMeta(items, false, level)
  }

  if (properties) {
    resolved.properties = resolveSchemaPropertiesMeta(property, level + 1)
  }

  const service = schemaPropertyServiceFactory(property, level)
  const { component } = service

  if (component) {
    const attrs = getSchemaPropertyAttrs(property)
    const validators = getSchemaPropertyValidators(property, required)

    // marking this as raw is important because we don't want to add reactivity to a component instance
    resolved.meta = markRaw({
      ...component,
      attrs,
      validators,
      required,
    })
  }

  return resolved
}