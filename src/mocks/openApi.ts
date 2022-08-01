/* eslint-disable prefer-arrow-callback */
import { MockFunction } from '@/services'
import { PydanticStringFormats, PydanticTypeDefinition, PydanticTypes } from '@/types/Pydantic'
import { kebabCase } from '@/utilities'
import { choice } from '@/utilities/arrays'
import { uniform } from '@/utilities/math'

export const randomOpenApiProperty: MockFunction<PydanticTypeDefinition, [PydanticTypeDefinition?]> = function(overrides = {}) {
  // propertyTypeFirstDraw lets us reduce the number of `null` type definitions by half
  const propertyTypeFirstDraw = choice(PydanticTypes)
  const propertyType = propertyTypeFirstDraw == 'null' ? choice(PydanticTypes) : propertyTypeFirstDraw
  const propertyFormat = propertyType == 'string' ? choice(PydanticStringFormats) : undefined

  const defaultTypeStringFormatMap: Record<Partial<typeof PydanticStringFormats[number]>, unknown> = {
    date: this.create('date'),
    'date-time': this.create('date'),
    email: this.create('email'),
    'json-string': '',
    regex: '/w+/gi',
    'time-delta': 600,
  }

  const defaultTypeMap: Record<typeof PydanticTypes[number], unknown> = {
    null: null,
    array: [],
    string: propertyFormat ? defaultTypeStringFormatMap[propertyFormat] : undefined,
    boolean: false,
    integer: 1,
    number: 1.6,
    object: {},
  }

  return {
    title: this.create('noun'),
    type: propertyType,
    description: uniform(0, 10) > 7 ? this.create('sentence') : undefined,
    default: defaultTypeMap[propertyType],
    ...propertyFormat ? { format: propertyFormat } : {},
  }
}

export const randomOpenApiSchema: MockFunction<PydanticTypeDefinition, [PydanticTypeDefinition?]> = function(overrides = {}) {
  const numberOfProperties = uniform(0, 30)
  const properties = Array.from({ length: numberOfProperties }, () => this.create('openApiProperty')).reduce<PydanticTypeDefinition['properties']>((properties = {}, property) => {
    properties[kebabCase(property.title!)] = property
    return properties
  }, {})

  return {
    title: 'Parameters',
    type: 'object',
    properties: properties,
  }
}