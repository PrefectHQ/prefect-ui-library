import { PTextInput, PToggle, PDateInput, PNumberInput, PCombobox, PSelect, SelectOption } from '@prefecthq/prefect-design'
import { markRaw } from 'vue'
import { isNumberArray, isStringArray } from './arrays'
import BlockDocumentInput from '@/components/BlockDocumentInput.vue'
import JsonInput from '@/components/JsonInput.vue'
import { NoSchemaPropertyDefaultValueError } from '@/models/NoSchemaPropertyDefaultValueError'
import { isEmail, greaterThanOrEqual, greaterThan, lessThan, lessThanOrEqual, isRequired, withMessage, ValidationRule, isValidJsonString } from '@/services'
import { Schema, schemaHas, SchemaProperty } from '@/types/schemas'
import { withPropsWithoutExcludedFactory } from '@/utilities/components'

export const INITIAL_PROPERTY_LEVEL = 1
export const MAX_PROPERTY_LEVEL = 2
export const MAX_PROPERTY_DEFAULT_VALUE = ''

const withProps = withPropsWithoutExcludedFactory('modelValue')

export type SchemaPropertyMeta = SchemaPropertyMetaComponent & SchemaPropertyMetaOptions

type SchemaPropertyMetaComponent = ReturnType<typeof withProps>

type SchemaPropertyMetaOptions = {
  attrs?: SchemaPropertyInputAttrs,
  validators?: ValidationRule | ValidationRule[],
  required?: boolean,
}

type SchemaPropertyInputAttrs = Record<string, unknown>

type GetSchemaPropertyMetaArgs = {
  property: SchemaProperty,
  schema: Schema,
  key: string,
  level: number,
}

// using any here means we can make an assumption that this is going to give us the correct typescript type for a schema property type
// Don't usually do this, but writing the types and overloads for this would be large and probably not worth it
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getSchemaPropertyDefaultValueForComponent(property: SchemaProperty, level: number): any {
  if (property.type === 'object' && level > MAX_PROPERTY_LEVEL) {
    return MAX_PROPERTY_DEFAULT_VALUE
  }

  switch (property.type) {
    case 'object':
      return getSchemaPropertyObjectDefaultValueForComponent(property)
    case 'null':
      throw new NoSchemaPropertyDefaultValueError()
    case 'array':
      return []
    case 'string':
      return getSchemaPropertyStringDefaultValueForComponent(property)
    case undefined:
    case 'boolean':
    case 'integer':
    case 'number':
    case 'block':
      return null
  }
}

export function getSchemaPropertyObjectDefaultValueForComponent(property: SchemaProperty): string | Record<never, never> {
  if (schemaHas(property, 'properties')) {
    return {}
  }

  return ''
}

export function getSchemaPropertyStringDefaultValueForComponent({ format }: SchemaProperty): null | string {
  switch (format) {
    case 'date':
    case 'date-time':
      return null
    default:
      return ''
  }
}

export function isSchemaPropertyDefaultValueForComponent(property: SchemaProperty, value: unknown, level: number): boolean {
  try {
    const defaultValue = getSchemaPropertyDefaultValueForComponent(property, level)

    return JSON.stringify(value) === JSON.stringify(defaultValue)
  } catch (error) {
    if (!(error instanceof NoSchemaPropertyDefaultValueError)) {
      console.error(error)
    }

    return false
  }
}

export function getSchemaPropertyMeta({ property, schema, key, level }: GetSchemaPropertyMetaArgs): SchemaPropertyMeta | void {
  if (property.type == 'object' && level > MAX_PROPERTY_LEVEL) {
    return getSchemaPropertyMaxLevelMeta(schema, key)
  }

  const component = getSchemaPropertyMetaComponent(property, schema, key)

  if (component === null) {
    return
  }

  const options = getSchemaPropertyMetaOptions(property, schema, key)

  return markRaw({ ...component, ...options })
}

function getSchemaPropertyMaxLevelMeta(schema: Schema, key: string): SchemaPropertyMeta | void {
  const component = withProps(JsonInput)
  const options = getSchemaPropertyMetaOptions({ type: undefined }, schema, key)

  options.attrs ??= {}
  options.attrs.placeholder ??= '{}'

  return {
    ...component,
    ...options,
  }
}

function getSchemaPropertyMetaOptions(property: SchemaProperty, schema: Schema, key: string): SchemaPropertyMetaOptions {
  return {
    validators: getSchemaPropertyValidators(property, schema, key),
    required: getSchemaPropertyIsRequired(schema, key),
    attrs: getSchemaPropertyAttrs(property),
  }
}

function getSchemaPropertyMetaComponent(property: SchemaProperty, schema: Schema, key: string): SchemaPropertyMetaComponent | null {
  if (!schemaHas(property, 'type')) {
    return null
  }

  switch (property.type) {
    case 'object':
      return getSchemaPropertyObjectComponent(property)
    case 'array':
      return getSchemaPropertyArrayMetaComponent(property, schema, key)
    case 'string':
      return getSchemaPropertyStringMetaComponent(property, schema, key)
    case 'integer':
    case 'number':
      return withProps(PNumberInput)
    case 'boolean':
      return withProps(PToggle)
    case 'block':
      return getSchemaPropertyBlockMetaComponent(property)
    case undefined:
      return withProps(JsonInput)
    default:
      return null
  }
}

function getSchemaPropertyBlockMetaComponent(property: SchemaProperty): SchemaPropertyMeta | null {
  if (!schemaHas(property, 'blockTypeSlug')) {
    return null
  }

  return withProps(BlockDocumentInput, {
    blockTypeSlug: property.blockTypeSlug,
  })
}

function getSchemaPropertyObjectComponent(property: SchemaProperty): SchemaPropertyMeta | null {
  if (schemaHas(property, 'properties')) {
    return null
  }

  return withProps(JsonInput)
}

function getSchemaPropertyStringMetaComponent(property: SchemaProperty, schema: Schema, key: string): SchemaPropertyMeta {
  if (schemaHas(property, 'enum')) {
    return withProps(PSelect, {
      options: getSchemaPropertySelectOptions(property, schema, key),
    })
  }

  switch (property.format) {
    case 'date':
      return withProps(PDateInput)
    case 'date-time':
      return withProps(PDateInput, { showTime: true })
    case 'json-string':
      return withProps(JsonInput)
    case 'time-delta':
      return withProps(PNumberInput)
    default:
      return withProps(PTextInput)
  }
}

function getSchemaPropertyArrayMetaComponent(property: SchemaProperty, schema: Schema, key: string): SchemaPropertyMeta {
  if (isStringArray(property.enum) || isNumberArray(property.enum)) {
    return withProps(PSelect, {
      options: getSchemaPropertySelectOptions(property, schema, key),
    })
  }

  if (schemaHas(property, 'items') && property.items.type !== 'string') {
    return withProps(JsonInput)
  }

  return withProps(PCombobox, { options: [], allowUnknownValue: true })
}

function getSchemaPropertyValidators(property: SchemaProperty, schema: Schema, key: string): ValidationRule[] {
  const { title = 'Property', type } = property
  const validators: ValidationRule[] = []

  if (type === undefined) {
    validators.push(withMessage(isValidJsonString, `${title} must be JSON`))
  }

  if (property.type === 'string') {
    if (property.format === 'email') {
      validators.push(withMessage(isEmail, `${title} must be a valid email address`))
    }

    if (property.format === 'json-string') {
      validators.push(withMessage(isValidJsonString, `${title} must be JSON`))
    }
  }

  const greaterThanOrEqualValue = property.minLength ?? property.minimum ?? property.minItems

  if (greaterThanOrEqualValue !== undefined) {
    validators.push(withMessage(greaterThanOrEqual(greaterThanOrEqualValue), `${title} must be greater than or equal to ${greaterThanOrEqualValue}`))
  }

  const lessThanOrEqualValue = property.maxLength ?? property.maximum ?? property.maxItems

  if (lessThanOrEqualValue !== undefined) {
    validators.push(withMessage(lessThanOrEqual(lessThanOrEqualValue), `${title} must be less than or equal to ${lessThanOrEqualValue}`))
  }

  if (property.exclusiveMinimum !== undefined) {
    validators.push(withMessage(greaterThan(property.exclusiveMinimum), `${title} must be greater than ${property.exclusiveMinimum}`))
  }

  if (property.exclusiveMaximum !== undefined) {
    validators.push(withMessage(lessThan(property.exclusiveMaximum), `${title} must be less than ${property.exclusiveMaximum}`))
  }

  if (getSchemaPropertyIsRequired(schema, key)) {
    validators.push(withMessage(isRequired, `${title} is required`))
  }

  return validators
}

function getSchemaPropertyIsRequired(schema: SchemaProperty, key: string): boolean {
  return !!schema.required?.includes(key)
}

function getSchemaPropertyAttrs(property: SchemaProperty): SchemaPropertyInputAttrs {
  const attrs: SchemaPropertyInputAttrs = {}

  const placeholder = property.default ?? property.example

  if (placeholder) {
    attrs.placeholder = placeholder
  }

  if (property.minLength !== undefined || property.minimum !== undefined) {
    attrs.min = property.minLength ?? property.minimum
  }

  if (property.maxLength !== undefined || property.maximum !== undefined) {
    attrs.max = property.maxLength ?? property.maximum
  }

  if (property.multipleOf) {
    attrs.step = property.multipleOf
  }

  // todo: confirm we should do this. this might break secrets
  if (property.format === 'password') {
    attrs.type = 'password'
  }

  return attrs
}

function getSchemaPropertySelectOptions(property: SchemaProperty, schema: Schema, key: string): SelectOption[] {
  const options: SelectOption[] = []

  if (!getSchemaPropertyIsRequired(schema, key)) {
    options.push({ label: 'None', value: null })
  }

  if (property.enum && isStringArray(property.enum)) {
    const mapped = property.enum.map<SelectOption>(value => ({ label: value, value }))

    options.push(...mapped)
  }

  return options
}