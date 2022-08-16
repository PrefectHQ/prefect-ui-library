import { MockFunction } from '@/services'
import { SchemaStringFormats, SchemaTypes, Schema, SchemaProperty } from '@/types/schemas'
import { kebabCase } from '@/utilities'
import { choice } from '@/utilities/arrays'
import { uniform } from '@/utilities/math'

export const randomSchemaProperty: MockFunction<SchemaProperty, [SchemaProperty?]> = function(overrides = {}) {
  // propertyTypeFirstDraw lets us reduce the number of `null` type definitions by half
  const propertyTypeFirstDraw = choice(SchemaTypes)
  const propertyType = propertyTypeFirstDraw == 'null' ? choice(SchemaTypes) : propertyTypeFirstDraw
  const propertyFormat = propertyType == 'string' && uniform(0, 10) > 8 ? choice(SchemaStringFormats) : undefined

  const defaultTypeStringFormatMap: Record<Partial<typeof SchemaStringFormats[number]>, unknown> = {
    date: this.create('date'),
    'date-time': this.create('date'),
    email: this.create('email'),
    'json-string': '{}',
    regex: '/w+/gi',
    'time-delta': 600,
  }

  const defaultTypeMap: Record<typeof SchemaTypes[number], unknown> = {
    null: null,
    array: [],
    string: propertyFormat ? defaultTypeStringFormatMap[propertyFormat] : undefined,
    boolean: false,
    integer: 1,
    number: 1.6,
    object: '{}',
  }

  return {
    title: this.create('noun'),
    type: propertyType,
    description: uniform(0, 10) > 7 ? this.create('sentence') : undefined,
    default: propertyType == 'object' || uniform(0, 10) > 4 ? defaultTypeMap[propertyType] : undefined,
    ...propertyFormat ? { format: propertyFormat } : {},
    ...overrides,
  }
}

export const randomSchema: MockFunction<Schema, [Schema?]> = function(overrides = {}) {
  const numberOfProperties = uniform(0, 30)
  const properties = Array.from({ length: numberOfProperties }, () => this.create('schemaProperty')).reduce<Schema['properties']>((properties = {}, property) => {
    properties[kebabCase(property.title!)] = property
    return properties
  }, {})

  return {
    title: 'Open API Schema',
    type: 'object',
    properties: properties,
    ...overrides,
  }
}