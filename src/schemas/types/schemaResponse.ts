import { SchemaDefinition, SchemaPropertyType, SchemaStringFormat } from '@/schemas/types/schema'

export type SchemaPropertiesResponse = Record<string, SchemaPropertyResponse>
export type SchemaDefinitionsResponse = Record<string, SchemaPropertyResponse>

// Commented out properties are unused. Left here for future reference
export type SchemaPropertyResponse = {
  // prefect specific properties
  position?: number,
  block_type_slug?: string,

  // open api properties
  $ref?: SchemaDefinition,
  anyOf?: SchemaPropertyResponse[],
  allOf?: SchemaPropertyResponse[],
  // oneOf?: SchemaPropertyResponse[],
  example?: string,
  // alias?: string,
  default?: unknown,
  const?: unknown,
  description?: string,
  enum?: unknown[],
  // exclusiveMaximum?: boolean | number,
  // exclusiveMinimum?: boolean | number,
  format?: SchemaStringFormat,
  items?: SchemaPropertyResponse | SchemaPropertyResponse[],
  prefixItems?: SchemaPropertyResponse[],
  // maximum?: number,
  maxItems?: number,
  // maxLength?: number,
  // minimum?: number,
  minItems?: number,
  // minLength?: number,
  // multipleOf?: number,
  // pattern?: string,
  properties?: SchemaPropertiesResponse,
  required?: string[],
  title?: string,
  type?: SchemaPropertyType,
  // uniqueItems?: boolean,
}

export type SchemaResponse = SchemaPropertyResponse & {
  definitions?: SchemaDefinitionsResponse,
}
