import { SchemaReference, SchemaType, SchemaStringFormat, SchemaEnum } from '@/types/schemas'

export type BlockSchemaReferenceResponse = {
  block_schema_checksum: string,
  block_type_slug: string,
}

export type BlockSchemaReferencesResponse = Record<string, BlockSchemaReferenceResponse | undefined>

export type SchemaPropertiesResponse = Record<string, SchemaPropertyResponse | undefined>
export type SchemaDefinitionsResponse = Record<string, SchemaResponse | undefined>

export type SchemaPropertyResponse = {
  // prefect specific properties
  block_type_slug?: string,

  // open api properties
  $ref?: SchemaReference,
  anyOf?: SchemaPropertyResponse[],
  allOf?: SchemaPropertyResponse[],
  example?: string,
  alias?: string,
  default?: unknown,
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

export type SchemaResponse = SchemaPropertyResponse & {
  // prefect specific properties
  block_schema_references?: BlockSchemaReferenceResponse,
  secret_fields?: string[],

  // open api properties
  definitions?: SchemaDefinitionsResponse,
}