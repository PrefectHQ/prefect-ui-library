import { BlockSchemaReferencesResponse } from './BlockSchemaResponse'
import { SchemaReference, SchemaType, SchemaStringFormat, SchemaEnum } from '@/types/schemas'

export type SchemaDefinitionsResponse = Record<string, SchemaResponse | undefined>

export type SchemaPropertyResponse = SchemaResponse & {
  $ref?: SchemaReference<string>,
  anyOf?: SchemaPropertyResponse[],
  allOf?: SchemaPropertyResponse[],
}

export type SchemaPropertiesResponse = Record<string, SchemaPropertyResponse>

export type SchemaResponse = {
  alias?: string,
  block_schema_references?: BlockSchemaReferencesResponse,
  default?: unknown,
  definitions?: SchemaDefinitionsResponse,
  description?: string,
  enum?: SchemaEnum<unknown>,
  exclusiveMaximum?: number,
  exclusiveMinimum?: number,
  format?: SchemaStringFormat,
  items?: SchemaPropertyResponse,
  maximum?: number,
  maxItems?: number,
  maxLength?: number,
  minimum?: number,
  minItems?: number,
  minLength?: number,
  multipleOf?: number,
  pattern?: string,
  properties?: SchemaPropertiesResponse,
  required?: string[],
  title?: string,
  type?: SchemaType,
  uniqueItems?: boolean,
}