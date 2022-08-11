export const PydanticStringFormats = ['date', 'regex', 'date-time', 'time-delta', 'email', 'json-string'] as const
export const PydanticTypes = ['null', 'string', 'boolean', 'integer', 'number', 'array', 'object'] as const
export const BaseDefinitionRefString = '#/definitions/' as const
export const RefStringRegExp = new RegExp(/^(?:#\/definitions\/)(.*)/)

export type PydanticType = typeof PydanticTypes[number]
export type PydanticStringFormat = typeof PydanticStringFormats[number]
export type PydanticEnum<T> = T[]
export type PydanticTypeRef<T extends string> = `${typeof BaseDefinitionRefString}${T}`
export type PydanticDefinitionsMap = Record<string, PydanticTypeDefinition>
export type PydanticPropertiesMap = Record<string, PydanticTypeProperty>
export type PydanticPropertyRecord = Record<'anyOf' | 'allOf' | string, PydanticTypeRef<string>[] | PydanticTypeDefinition[] | never>

export interface PydanticTypeDefinition {
  title?: string,
  type?: PydanticType,
  format?: PydanticStringFormat,
  alias?: string,
  description?: string,
  default?: unknown,
  enum?: PydanticEnum<unknown>,
  definitions?: PydanticDefinitionsMap,
  properties?: PydanticPropertiesMap,
  required?: string[],
  items?: PydanticTypeDefinition | PydanticTypeDefinition[],
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

export interface PydanticResolvedTypeDefinition extends PydanticTypeDefinition {
  type: PydanticType,
  definitions?: Record<string, PydanticResolvedTypeDefinition>,
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
