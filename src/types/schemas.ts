import { Require } from './utilities'
import { SchemaPropertyMeta } from '@/utilities'

export type SchemaValue = unknown
export type SchemaValues = Record<string, SchemaValue | undefined>

export const SchemaStringFormats = ['date', 'regex', 'date-time', 'time-delta', 'email', 'json-string', 'password'] as const
const apiSchemaTypes = ['null', 'string', 'boolean', 'integer', 'number', 'array', 'object'] as const
const uiOnlySchemaTypes = ['block'] as const
export const SchemaTypes = [...apiSchemaTypes, ...uiOnlySchemaTypes] as const
export const BaseDefinitionRefString = '#/definitions/' as const

export type SchemaType = typeof SchemaTypes[number]
export type SchemaStringFormat = typeof SchemaStringFormats[number]
export type SchemaEnum<T> = T[]
export type SchemaReference<T extends string> = `${typeof BaseDefinitionRefString}${T}`
export type SchemaDefinitions = Record<string, Schema | undefined>

export type BlockSchemaReference = {
  blockSchemaChecksum: string,
  blockTypeSlug: string,
}
export type BlockSchemaReferences = Record<string, BlockSchemaReference | undefined>

export type SchemaProperty = Omit<Schema, 'definitions' | 'blockSchemaReferences'> & {
  anyOf?: SchemaProperty[],
  allOf?: SchemaProperty[],
  meta?: SchemaPropertyMeta,
  example?: string,
  isRequired?: boolean,
  /** @deprecated use blockTypeSlug field instead */
  blockReference?: BlockSchemaReference,
  blockTypeSlug?: string,
}

export type SchemaPropertyAnyOf = Require<SchemaProperty, 'anyOf'>
export type SchemaPropertyAllOf = Require<SchemaProperty, 'allOf'>

export type SchemaProperties = Record<string, SchemaProperty>

export type Schema = {
  alias?: string,
  blockTypeSlug?: string,
  blockSchemaReferences?: BlockSchemaReferences,
  default?: unknown,
  definitions?: SchemaDefinitions,
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

export function isSchemaValues(input: unknown): input is SchemaValues {
  return typeof input === 'object' && input !== null && !Array.isArray(input)
}

export function schemaHas<T extends Schema | SchemaProperty, P extends keyof T>(schema: T, property: P): schema is T & Require<T, P> {
  return property in schema
}
