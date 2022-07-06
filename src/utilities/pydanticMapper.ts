

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

import { PTextInput, PToggle, PTextarea, PDateInput, PNumberInput, PCombobox } from '@prefecthq/prefect-design'
import JsonEditor from '@/components/JsonEditor.vue'
import { ValidateMethod, isEmail, greaterThanOrEqual, greaterThan, lessThan, lessThanOrEqual } from '@/services'

export type PydanticType = 'null' | 'string' | 'boolean' | 'integer' | 'number' | 'array' | 'object'
export type PydanticStringFormat = 'date' | 'regex' | 'date-time' | 'time-delta' | 'email' | 'json-string'
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


const InputComponents = [PToggle, PTextInput, PTextarea, JsonEditor, PDateInput, PNumberInput, PCombobox] as const

export type TypeDefinitionComponentAttrs = Record<string, unknown>
export type TypeDefinitionComponent = {
  attrs: TypeDefinitionComponentAttrs,
  component?: typeof InputComponents[number],
  defaultValue: unknown,
  validators: ValidateMethod[],
}


interface BaseJsonInput extends TypeDefinitionComponent {
  component: typeof JsonEditor,
  defaultValue: string,
}
const baseJsonInput: BaseJsonInput = {
  attrs: {},
  component: JsonEditor,
  defaultValue: '',
  validators: [],
}

interface BaseTextInput extends TypeDefinitionComponent {
  attrs: {
    type: 'text',
  },
  component: typeof PTextInput,
  defaultValue: string,
}
const baseTextInput: BaseTextInput = {
  attrs: {
    type: 'text',
  },
  defaultValue: '',
  component: PTextInput,
  validators: [],
}

interface BaseToggleInput extends TypeDefinitionComponent {
  component: typeof PToggle,
  defaultValue: boolean,
}
const baseToggleInput: BaseToggleInput = {
  attrs: {},
  component: PToggle,
  defaultValue: false,
  validators: [],
}

interface BaseNumberInput extends TypeDefinitionComponent {
  attrs: {
    min?: number | string,
    max?: number | string,
    step?: number | string,
  },
  component: typeof PNumberInput,
  defaultValue: number,
}
const baseNumberInput: BaseNumberInput = {
  attrs: {},
  component: PNumberInput,
  defaultValue: 0,
  validators: [],
}

interface BaseEnumInput extends TypeDefinitionComponent {
  attrs: {
    allowUnknownValue: boolean,
    multiple: boolean,
    options: PydanticEnum<unknown>,
  },
  component: typeof PCombobox,
  defaultValue: unknown[],
}
const baseEnumInput: BaseEnumInput = {
  attrs: {
    allowUnknownValue: false,
    multiple: false,
    options: [] as PydanticEnum<unknown>,
  },
  component: PCombobox,
  defaultValue: [],
  validators: [],
}

interface BaseDateInput extends TypeDefinitionComponent {
  attrs: {
    showTime: boolean,
  },
  component: typeof PDateInput,
  defaultValue: Date,
}
const baseDateInput: BaseDateInput = {
  attrs: {
    showTime: false,
  },
  component: PDateInput,
  defaultValue: new Date(),
  validators: [],
}


const StringFormatComponentMap: Record<PydanticStringFormat, TypeDefinitionComponent> = {
  'date': baseDateInput,
  'date-time': {
    ...baseDateInput,
    attrs: {
      showTime: true,
    },
  },
  'regex': baseTextInput,
  'email': {
    ...baseTextInput,
    validators: [isEmail],
  },
  'json-string': baseJsonInput,
  'time-delta': baseNumberInput,
}

export function isPydanticType<T extends PydanticType>(desired: T, type?: PydanticType): type is Extract<PydanticType, T> {
  return type == desired
}

export function isPydanticStringFormat(format?: PydanticStringFormat): format is PydanticStringFormat {
  return !!format && format in StringFormatComponentMap
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

/*
Unique items (e.g. Set)

Types:
  null (default)
  boolean
  integer
  number
  array[Types]
  object[Types]
  string:
    None (default)
    binary
    date
    time
    regex
    date-time
    time-delta
    email
    json-string

  anyOf
  allOf
*/

const getValidators = (definition: TypeDefinition): ValidateMethod[] => {
  const validators: ValidateMethod[] = []

  if (hasMinLength(definition)) {
    validators.push(greaterThanOrEqual(definition.minLength))
  }

  if (hasMaxLength(definition)) {
    validators.push(lessThanOrEqual(definition.maxLength))
  }

  if (hasMin(definition) || hasExclusiveMin(definition)) {
    validators.push(greaterThan(definition.minimum ?? definition.exclusiveMinimum))
  }

  if (hasMax(definition) || hasExclusiveMax(definition)) {
    validators.push(lessThan(definition.maximum ?? definition.exclusiveMaximum))
  }

  if (hasMinItems(definition)) {
    validators.push(greaterThanOrEqual(definition.minItems))
  }

  if (hasMaxItems(definition)) {
    validators.push(lessThanOrEqual(definition.maxItems))
  }

  return validators
}

const getAttrs = (definition: TypeDefinition): TypeDefinitionComponentAttrs => {
  const attrs: TypeDefinitionComponentAttrs = {}

  if (hasMinLength(definition) || hasMin(definition)) {
    attrs.min = definition.minLength ?? definition.minimum
  }

  if (hasMaxLength(definition) || hasMax(definition)) {
    attrs.max = definition.maxLength ?? definition.maximum
  }

  if (hasMultipleOf(definition)) {
    attrs.step = definition.multipleOf
  }

  return attrs
}

const getBaseComponent = (definition: TypeDefinition): null | TypeDefinitionComponent => {
  const { type, format, enum: defEnum } = definition

  if (isPydanticEnum(definition)) {
    const component = baseEnumInput
    component.attrs.options = defEnum as PydanticEnum<PydanticType>

    if (isPydanticType('array', type)) {
      component.attrs.multiple = true
    }

    return component
  }

  if (isPydanticType('string', type)) {
    let component
    if (isPydanticStringFormat(format)) {
      component = StringFormatComponentMap[format]
    } else {
      component = baseTextInput
    }

    return component
  }

  if (isPydanticType('boolean', type)) {
    const component = baseToggleInput
    return component
  }

  if (isPydanticType('number', type) || isPydanticType('integer', type)) {
    const component = baseNumberInput
    return component
  }

  if (isPydanticType('array', type)) {
    const component = baseEnumInput
    component.attrs.allowUnknownValue = true
    component.attrs.multiple = true

    return component
  }

  if (isPydanticType('object', type)) {
    const component = baseJsonInput
    return component
  }

  if (isPydanticType('null', type)) {
    return null
  }

  return baseTextInput
}


export const getComponentFromTypeDefinition = (definition: TypeDefinition): null | TypeDefinitionComponent => {
  const component = getBaseComponent(definition)

  if (!component) {
    return null
  }

  component.validators = getValidators(definition)
  component.attrs = { ...component.attrs, ...getAttrs(definition) }

  return component
}