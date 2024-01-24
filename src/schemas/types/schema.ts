import { createTuple } from '@/utilities'

export const { values: schemaTypes, isValue: isSchemaType } = createTuple([
  'string',
  'boolean',
  'integer',
  'number',
  'array',
  'object',
])

export type SchemaType = typeof schemaTypes[number]

export const { values: schemaStringFormat, isValue: isSchemaStringFormat } = createTuple([
  'date',
  'date-time',
  // 'time-delta',
  'regex',
  // 'email',
  // 'json-string',
  'password',
])

export type SchemaStringFormat = typeof schemaStringFormat[number]

export type SchemaPropertiesResponse = Record<string, SchemaPropertyResponse>
export type SchemaDefinitionsResponse = Record<string, SchemaPropertyResponse>

export type SchemaDefinition = `#/definitions/${string}`

// Commented out properties are unused. Left here for future reference
export type SchemaPropertyResponse = {
  // prefect specific properties
  position?: number,

  // open api properties
  $ref?: SchemaDefinition,
  anyOf?: SchemaPropertyResponse[],
  allOf?: SchemaPropertyResponse[],
  // oneOf?: SchemaPropertyResponse[],
  example?: string,
  // alias?: string,
  default?: unknown,
  description?: string,
  enum?: unknown[],
  // exclusiveMaximum?: boolean | number,
  // exclusiveMinimum?: boolean | number,
  format?: SchemaStringFormat,
  items?: SchemaPropertyResponse,
  // maximum?: number,
  // maxItems?: number,
  // maxLength?: number,
  // minimum?: number,
  // minItems?: number,
  // minLength?: number,
  // multipleOf?: number,
  // pattern?: string,
  properties?: SchemaPropertiesResponse,
  required?: string[],
  title?: string,
  type?: SchemaType,
  // uniqueItems?: boolean,
}

export type SchemaResponse = SchemaPropertyResponse & {
  definitions?: SchemaDefinitionsResponse,
}

// For now these are the same. Once we get to block references and secrets there will be some snake to camel case conversions
export type SchemaProperties = SchemaPropertiesResponse
export type SchemaProperty = SchemaPropertyResponse
export type Schema = SchemaResponse