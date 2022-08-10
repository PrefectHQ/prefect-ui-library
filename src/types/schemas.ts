import { Require } from './utilities'
import { SchemaPropertyResponse, SchemaResponse } from '@/models/api/SchemaResponse'

export type SchemaValue = unknown
export type SchemaValues = Record<string, SchemaValue | undefined>

export const SchemaStringFormats = ['date', 'regex', 'date-time', 'time-delta', 'email', 'json-string'] as const
export const SchemaTypes = ['null', 'string', 'boolean', 'integer', 'number', 'array', 'object'] as const
export const BaseDefinitionRefString = '#/definitions/' as const

export type SchemaType = typeof SchemaTypes[number]
export type SchemaStringFormat = typeof SchemaStringFormats[number]
export type SchemaEnum<T> = T[]
export type SchemaReference<T extends string> = `${typeof BaseDefinitionRefString}${T}`
export type SchemaDefinitions = Record<string, Schema | undefined>

export type SchemaProperty = Schema & {
  anyOf?: SchemaProperty[],
  allOf?: SchemaProperty[],
}

export type SchemaProperties = Record<string, SchemaProperty | undefined>

export type Schema = Omit<SchemaResponse, 'definitions' | 'properties' | 'items'> & {
  definitions?: SchemaDefinitions,
  properties?: SchemaProperties,
  items?: SchemaProperty,
}

export function schemaPropertyHas<T extends SchemaProperty | SchemaPropertyResponse, P extends keyof T>(schema: T, property: P): schema is T & Require<T, P> {
  return property in schema
}