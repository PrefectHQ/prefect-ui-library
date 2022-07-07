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
export const BaseDefinitionRefString = '#/definitions/' as const
export const RefStringRegExp = new RegExp(/^(?:#\/definitions\/)(.*)/)

export type PydanticType = typeof PydanticTypes[number]
export type PydanticStringFormat = typeof PydanticStringFormats[number]
export type PydanticEnum<T> = T[]
export type PydanticTypeRef<T extends string> = `${typeof BaseDefinitionRefString}${T}`
export type PydanticPropertyRecord = Record<'anyOf' | 'allOf' | string, PydanticTypeRef<string>[] | PydanticTypeDefinition[] | never>

export interface PydanticTypeDefinition {
  title?: string,
  type?: PydanticType,
  format?: PydanticStringFormat,
  alias?: string,
  description?: string,
  default?: unknown,
  enum?: PydanticEnum<unknown>,
  definitions?: Record<string, PydanticTypeDefinition>,
  properties?: Record<string, PydanticTypeProperty>,
  required?: string[],
  items?: PydanticTypeDefinition | PydanticTypeDefinition[] | PydanticPropertyRecord,
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

export interface PydanticTypeProperty extends PydanticTypeDefinition {
  $ref?: PydanticTypeRef<string>,
  anyOf?: PydanticTypeProperty[],
  allOf?: PydanticTypeProperty[],
}

export interface PydanticTypeDefinitionMinLength extends PydanticTypeDefinition {
  minLength: number,
}

export interface PydanticTypeDefinitionMaxLength extends PydanticTypeDefinition {
  maxLength: number,
}

export interface PydanticTypeDefinitionMin extends PydanticTypeDefinition {
  minimum: number,
}

export interface PydanticTypeDefinitionMax extends PydanticTypeDefinition {
  maximum: number,
}

export interface PydanticPropertyRecordAllOf extends PydanticTypeProperty {
  allOf: PydanticTypeProperty[],
}

export interface PydanticPropertyRecordAnyOf extends PydanticTypeProperty {
  anyOf: PydanticTypeProperty[],
}

export interface PydanticTypeDefinitionExclusiveMin extends PydanticTypeDefinition {
  exclusiveMinimum: number,
}

export interface PydanticTypeDefinitionExclusiveMax extends PydanticTypeDefinition {
  exclusiveMaximum: number,
}

export interface PydanticTypeDefinitionMinItems extends PydanticTypeDefinition {
  minItems: number,
}

export interface PydanticTypeDefinitionMaxItems extends PydanticTypeDefinition {
  maxItems: number,
}

export interface PydanticTypeDefinitionPattern extends PydanticTypeDefinition {
  pattern: string,
}

export interface PydanticTypeDefinitionUniqueItems extends PydanticTypeDefinition {
  uniqueItems: boolean,
}

export interface PydanticTypeDefinitionRequired extends PydanticTypeDefinition {
  required: string[],
}

export interface PydanticTypeDefinitionMultipleOf extends PydanticTypeDefinition {
  multipleOf: number,
}

export interface PydanticTypeDefinitionEnum extends PydanticTypeDefinition {
  enum: PydanticEnum<unknown>,
}

export interface PydanticTypeDefinitionProperties extends PydanticTypeDefinition {
  properties: Record<string, PydanticTypeProperty>,
}

export interface PydanticTypeDefinitionRef extends PydanticTypeProperty {
  $ref: PydanticTypeRef<string>,
}

export function isPydanticType<T extends PydanticType>(desired: T, type?: PydanticType): type is Extract<PydanticType, T> {
  return type == desired
}

export function isPydanticTypeRef(property: unknown): property is PydanticTypeRef<string> {
  return typeof property == 'string' && property.startsWith(BaseDefinitionRefString) && property.length > BaseDefinitionRefString.length
}

export function isPydanticStringFormat(format?: PydanticStringFormat): format is PydanticStringFormat {
  return !!format && PydanticStringFormats.includes(format)
}

export function isPydanticEnum(definition: PydanticTypeDefinition): definition is PydanticTypeDefinitionEnum {
  return 'enum' in definition
}

export function hasAllOf(property: PydanticTypeDefinition): property is PydanticPropertyRecordAllOf {
  return 'allOf' in property
}

export function hasAnyOf(property: PydanticTypeDefinition): property is PydanticPropertyRecordAnyOf {
  return 'anyOf' in property
}

export function hasTypeRef(definition: PydanticTypeDefinition): definition is PydanticTypeDefinitionRef {
  return '$ref' in definition
}

export function hasMinLength(definition: PydanticTypeDefinition): definition is PydanticTypeDefinitionMinLength {
  return 'minLength' in definition
}

export function hasMaxLength(definition: PydanticTypeDefinition): definition is PydanticTypeDefinitionMaxLength {
  return 'maxLength' in definition
}

export function hasMin(definition: PydanticTypeDefinition): definition is PydanticTypeDefinitionMin {
  return 'minimum' in definition
}

export function hasMax(definition: PydanticTypeDefinition): definition is PydanticTypeDefinitionMax {
  return 'maximum' in definition
}

export function hasMinItems(definition: PydanticTypeDefinition): definition is PydanticTypeDefinitionMinItems {
  return 'minItems' in definition
}

export function hasMaxItems(definition: PydanticTypeDefinition): definition is PydanticTypeDefinitionMaxItems {
  return 'maxItems' in definition
}

export function hasExclusiveMin(definition: PydanticTypeDefinition): definition is PydanticTypeDefinitionExclusiveMin {
  return 'exclusiveMinimum' in definition
}

export function hasExclusiveMax(definition: PydanticTypeDefinition): definition is PydanticTypeDefinitionExclusiveMax {
  return 'exclusiveMaximum' in definition
}

export function hasMultipleOf(definition: PydanticTypeDefinition): definition is PydanticTypeDefinitionMultipleOf {
  return 'multipleOf' in definition
}

