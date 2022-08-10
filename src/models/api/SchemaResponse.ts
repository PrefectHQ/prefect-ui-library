import { SchemaReference, SchemaType, SchemaStringFormat, SchemaEnum } from '@/types/schemas'

export type SchemaDefinitionsResponse = Record<string, SchemaResponse | undefined>

export interface SchemaPropertyResponse extends SchemaResponse {
  $ref?: SchemaReference<string>,
  anyOf?: SchemaPropertyResponse[],
  allOf?: SchemaPropertyResponse[],
}

export type SchemaPropertiesResponse = Record<string, SchemaPropertyResponse | undefined>

export interface SchemaResponse {
  title?: string,
  type?: SchemaType,
  format?: SchemaStringFormat,
  alias?: string,
  description?: string,
  default?: unknown,
  enum?: SchemaEnum<unknown>,
  definitions?: SchemaDefinitionsResponse,
  properties?: SchemaPropertiesResponse,
  required?: string[],
  items?: SchemaPropertyResponse,
  exclusiveMaximum?: number,
  exclusiveMinimum?: number,
  maximum?: number,
  minimum?: number,
  maxLength?: number,
  minLength?: number,
  maxItems?: number,
  minItems?: number,
  multipleOf?: number,
  uniqueItems?: boolean,
  pattern?: string,
}