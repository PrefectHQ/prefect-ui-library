import { SchemaProperty, SchemaPropertyType } from '@/schemas/types/schema'

const schemaPropertyTypeLabelMap: Record<SchemaPropertyType, string> = {
  'null': 'None',
  'string': 'str',
  'boolean': 'bool',
  'integer': 'int',
  'number': 'float',
  'array': 'list',
  'object': 'dict',
}

export function getSchemaPropertyTypeLabel(type: SchemaPropertyType | undefined): string {
  if (type) {
    return schemaPropertyTypeLabelMap[type]
  }

  return ''
}

export function getSchemaPropertyLabel(property: SchemaProperty): string {
  const type = getSchemaPropertyTypeLabel(property.type)

  return property.title ?? property.format ?? type
}