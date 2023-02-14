import { SchemaResponse } from '@/models'
import { mapper, MockFunction } from '@/services'
import { SchemaStringFormats, SchemaTypes, Schema, SchemaProperty, SchemaProperties } from '@/types/schemas'
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
    password: this.create('string'),
  }

  const defaultTypeMap: Record<typeof SchemaTypes[number], unknown> = {
    null: null,
    array: [],
    string: propertyFormat ? defaultTypeStringFormatMap[propertyFormat] : undefined,
    boolean: false,
    integer: 1,
    number: 1.6,
    object: {},
    block: null,
  }

  return {
    title: this.create('noun'),
    type: propertyType,
    description: uniform(0, 10) > 7 ? this.create('sentence') : undefined,
    default: propertyType == 'object' || uniform(0, 10) > 4 ? defaultTypeMap[propertyType] : undefined,
    properties: propertyType === 'object' ? this.create('schemaProperties') : undefined,
    ...propertyFormat ? { format: propertyFormat } : {},
    ...overrides,
  }
}

export const randomSchema: MockFunction<Schema, [Schema?]> = function(overrides = {}) {
  const schema: SchemaResponse = {
    title: 'Open API Schema',
    type: 'object',
    properties: this.create('schemaProperties'),
    ...overrides,
  }

  return mapper.map('SchemaResponse', schema, 'Schema')
}

export const randomSchemaProperties: MockFunction<SchemaProperties, [SchemaProperties?]> = function(overrides = {}) {
  const properties = this.createMany('schemaProperty', this.create('number', [1, 5])).reduce<Schema['properties']>((properties = {}, property) => {
    properties[kebabCase(property.title!)] = property

    return properties
  }, {})

  return {
    ...properties,
    ...overrides,
  }
}