// Excluded formats:
/*
  ipv4
  ipv6
  ipvanyaddress
  ipv4interface
  ipv6interface
  ipvanyinterface
  ipv4network
  ipv6network
  ipvanynetwork

  binary
  time
  name-email

  uuid
  uuid1
  uuid3
  uuid4
  uuid5

  // Maybe include?
  file-path
  directory-path
  path
*/

export const PydanticStringFormats = ['date', 'regex', 'date-time', 'time-delta', 'email', 'json-string'] as const
export const PydanticTypes = ['null', 'string', 'boolean', 'integer', 'number', 'array', 'object'] as const
export type PydanticType = typeof PydanticTypes[number]
export type PydanticStringFormat = typeof PydanticStringFormats[number]
export type PydanticEnum<T> = T[]
export type PydanticTypeRef<T extends string> = `#/definitions/${T}`
export type PydanticItemsRecord = Record<'anyOf' | 'allOf' | string, PydanticTypeRef<string> | TypeDefinition | TypeDefinition[] | never>

export interface TypeDefinition {
  title?: string,
  type?: PydanticType,
  format?: PydanticStringFormat,
  alias?: string,
  description?: string,
  default?: unknown,
  enum?: PydanticEnum<unknown>,
  properties?: Record<string, TypeDefinition>,
  required?: string[],
  items?: TypeDefinition | TypeDefinition[] | PydanticItemsRecord,
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

export interface TypeDefinitionMinLength extends TypeDefinition {
  minLength: number,
}

export interface TypeDefinitionMaxLength extends TypeDefinition {
  maxLength: number,
}

export interface TypeDefinitionMin extends TypeDefinition {
  minimum: number,
}

export interface TypeDefinitionMax extends TypeDefinition {
  maximum: number,
}

export interface TypeDefinitionExclusiveMin extends TypeDefinition {
  exclusiveMinimum: number,
}

export interface TypeDefinitionExclusiveMax extends TypeDefinition {
  exclusiveMaximum: number,
}

export interface TypeDefinitionMinItems extends TypeDefinition {
  minItems: number,
}

export interface TypeDefinitionMaxItems extends TypeDefinition {
  maxItems: number,
}

export interface TypeDefinitionPattern extends TypeDefinition {
  pattern: string,
}

export interface TypeDefinitionUniqueItems extends TypeDefinition {
  uniqueItems: boolean,
}

export interface TypeDefinitionRequired extends TypeDefinition {
  required: string[],
}

export interface TypeDefinitionMultipleOf extends TypeDefinition {
  multipleOf: number,
}

export interface TypeDefinitionEnum extends TypeDefinition {
  enum: PydanticEnum<unknown>,
}

export interface TypeDefinitionProperties extends TypeDefinition {
  properties: Record<string, TypeDefinition>,
}

export function isPydanticType<T extends PydanticType>(desired: T, type?: PydanticType): type is Extract<PydanticType, T> {
  return type == desired
}

export function isPydanticStringFormat(format?: PydanticStringFormat): format is PydanticStringFormat {
  return !!format && PydanticStringFormats.includes(format)
}

export function isPydanticEnum(definition: TypeDefinition): definition is TypeDefinitionEnum {
  return 'enum' in definition
}

export function hasMinLength(definition: TypeDefinition): definition is TypeDefinitionMinLength {
  return 'minLength' in definition
}

export function hasMaxLength(definition: TypeDefinition): definition is TypeDefinitionMaxLength {
  return 'maxLength' in definition
}

export function hasMin(definition: TypeDefinition): definition is TypeDefinitionMin {
  return 'minimum' in definition
}

export function hasMax(definition: TypeDefinition): definition is TypeDefinitionMax {
  return 'maximum' in definition
}

export function hasMinItems(definition: TypeDefinition): definition is TypeDefinitionMinItems {
  return 'minItems' in definition
}

export function hasMaxItems(definition: TypeDefinition): definition is TypeDefinitionMaxItems {
  return 'maxItems' in definition
}

export function hasExclusiveMin(definition: TypeDefinition): definition is TypeDefinitionExclusiveMin {
  return 'exclusiveMinimum' in definition
}

export function hasExclusiveMax(definition: TypeDefinition): definition is TypeDefinitionExclusiveMax {
  return 'exclusiveMaximum' in definition
}

export function hasMultipleOf(definition: TypeDefinition): definition is TypeDefinitionMultipleOf {
  return 'multipleOf' in definition
}

