import { SchemaPropertyComponentWithProps } from '@/services/schemas/utilities'
import { ValidationRule } from '@/services/validate'
import { Require } from '@/types/utilities'

export type SchemaValue = unknown
export type SchemaValues = Record<string, SchemaValue | undefined>

export const SchemaStringFormats = ['date', 'regex', 'date-time', 'time-delta', 'email', 'json-string', 'password'] as const
export const SchemaTypes = [
  // prefect ui custom types
  'block',
  // open api types
  'null', 'string', 'boolean', 'integer', 'number', 'array', 'object',
] as const
export const BaseDefinitionRefString = '#/definitions/' as const

export type SchemaType = typeof SchemaTypes[number]
export type SchemaStringFormat = typeof SchemaStringFormats[number]
export type SchemaEnum<T> = T[]
export type SchemaReference = `${typeof BaseDefinitionRefString}${string}`
export type SchemaDefinitions = Record<string, Schema | undefined>

export type BlockSchemaReference = {
  blockSchemaChecksum: string,
  blockTypeSlug: string,
}

export type BlockSchemaReferences = Record<string, BlockSchemaReference | undefined>

export type SchemaPropertyAnyOf = Require<SchemaProperty, 'anyOf'>
export type SchemaPropertyAllOf = Require<SchemaProperty, 'allOf'>
export type SchemaProperties = Record<string, SchemaProperty | undefined>

export type SchemaPropertyInputAttrs = Record<string, unknown>

export type SchemaPropertyMetaOptions = {
  attrs?: SchemaPropertyInputAttrs,
  validators?: ValidationRule | ValidationRule[],
  required?: boolean,
}

export type SchemaPropertyMeta = SchemaPropertyComponentWithProps & SchemaPropertyMetaOptions

export type SchemaProperty = {
  // prefect specific properties
  blockTypeSlug?: string,
  meta?: SchemaPropertyMeta,

  // open api properties
  $ref?: SchemaReference,
  anyOf?: SchemaProperty[],
  allOf?: SchemaProperty[],
  example?: string,
  alias?: string,
  default?: unknown,
  description?: string,
  enum?: SchemaEnum<unknown>,
  exclusiveMaximum?: number,
  exclusiveMinimum?: number,
  format?: SchemaStringFormat,
  items?: SchemaProperty,
  maximum?: number,
  maxItems?: number,
  maxLength?: number,
  minimum?: number,
  minItems?: number,
  minLength?: number,
  multipleOf?: number,
  pattern?: string,
  properties?: SchemaProperties,
  required?: string[],
  title?: string,
  type?: SchemaType,
  uniqueItems?: boolean,
}

export type Schema = SchemaProperty & {
  // prefect specific properties
  blockSchemaReferences?: BlockSchemaReferences,
  secretFields?: string[],

  // open api properties
  definitions?: SchemaDefinitions,
}

export function isSchemaValues(input: unknown): input is SchemaValues {
  return typeof input === 'object' && input !== null && !Array.isArray(input)
}

export function schemaHas<T extends Schema | SchemaProperty, P extends keyof T>(schema: T, property: P): schema is T & Require<T, P> {
  return property in schema
}
