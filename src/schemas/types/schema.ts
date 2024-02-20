import { isDefined } from '@prefecthq/prefect-design'
import { Simplify } from '@/types/utilities'
import { createTuple } from '@/utilities'

export const { values: schemaTypes, isValue: isSchemaType } = createTuple([
  'null',
  'string',
  'boolean',
  'integer',
  'number',
  'array',
  'object',
])

export type SchemaPropertyType = typeof schemaTypes[number]

export function isSchemaPropertyType<T extends SchemaPropertyType | undefined>(value: unknown, type: T): value is T {
  return value === type
}

export const { values: schemaStringFormat, isValue: isSchemaStringFormat } = createTuple([
  'date',
  'date-time',
  'password',
  'json-string',
])

export type SchemaStringFormat = typeof schemaStringFormat[number]
export type SchemaDefinition = `#/definitions/${string}`
export type SchemaProperties = Record<string, SchemaProperty>
export type SchemaDefinitions = Record<string, SchemaProperty>

export type SchemaProperty = {
  // prefect specific properties
  position?: number,
  blockTypeSlug?: string,

  // open api properties
  $ref?: SchemaDefinition,
  anyOf?: SchemaProperty[],
  allOf?: SchemaProperty[],
  example?: string,
  default?: unknown,
  const?: unknown,
  description?: string,
  enum?: unknown[],
  format?: SchemaStringFormat,
  items?: SchemaProperty | SchemaProperty[],
  properties?: SchemaProperties,
  required?: string[],
  title?: string,
  type?: SchemaPropertyType,
}

export function isPropertyWith<
  TKey extends keyof SchemaProperty
>(value: SchemaProperty, property: TKey): value is Simplify<SchemaProperty & Required<Pick<SchemaProperty, TKey>>> {
  return isDefined(value[property])
}

export type Schema = SchemaProperty & {
  definitions?: SchemaDefinitions,
}