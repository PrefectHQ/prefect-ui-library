import { Require } from './utilities'
import { SchemaResponse } from '@/models/api/SchemaResponse'

export type SchemaValue = unknown
export type SchemaValues = Record<string, SchemaValue | undefined>

export const SchemaStringFormats = ['date', 'regex', 'date-time', 'time-delta', 'email', 'json-string'] as const
export const SchemaTypes = ['null', 'string', 'boolean', 'integer', 'number', 'array', 'object'] as const
export const BaseDefinitionRefString = '#/definitions/' as const

export type SchemaType = typeof SchemaTypes[number]
export type SchemaStringFormat = typeof SchemaStringFormats[number]
export type SchemaEnum<T> = T[]
export type SchemaReference<T extends string> = `${typeof BaseDefinitionRefString}${T}`
export type SchemaDefinitions = Record<string, Schema>

export type SchemaProperty = Schema & {
  anyOf?: SchemaProperty[],
  allOf?: SchemaProperty[],
}

export type SchemaPropertyAnyOf = Require<SchemaProperty, 'anyOf'>
export type SchemaPropertyAllOf = Require<SchemaProperty, 'allOf'>

export type SchemaProperties = Record<string, SchemaProperty>

export type Schema = Omit<SchemaResponse, 'definitions' | 'properties' | 'items'> & {
  definitions?: SchemaDefinitions,
  properties?: SchemaProperties,
  items?: SchemaProperty,
}

export function isSchemaType<T extends SchemaType>(desired: T, type?: SchemaType): type is Extract<SchemaType, T> {
  return type == desired
}

export function isPydanticTypeRef(property: unknown): property is SchemaReference<string> {
  return typeof property == 'string' && property.startsWith(BaseDefinitionRefString) && property.length > BaseDefinitionRefString.length
}

export function isSchemaStringFormat(format?: SchemaStringFormat): format is SchemaStringFormat {
  return !!format && SchemaStringFormats.includes(format)
}
