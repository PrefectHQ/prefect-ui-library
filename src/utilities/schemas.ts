import { PTextInput, PToggle, PDateInput, PNumberInput, PCombobox, PSelect } from '@prefecthq/prefect-design'
import { isNumberArray, isStringArray } from './arrays'
import BlockDocumentInput from '@/components/BlockDocumentInput.vue'
import JsonInput from '@/components/JsonInput.vue'
import { isEmail, greaterThanOrEqual, greaterThan, lessThan, lessThanOrEqual, isRequired, withMessage, ValidationRule, isValidJsonString } from '@/services'
import { Schema, schemaHas, SchemaProperty } from '@/types/schemas'
import { withPropsWithoutExcludedFactory } from '@/utilities/components'

export const INITIAL_PROPERTY_LEVEL = 1
export const MAX_PROPERTY_LEVEL = 2

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

export function getSchemaPropertyMeta({ property, schema, key, level }: GetSchemaPropertyMetaArgs): SchemaPropertyMeta | void {
  if (property.type == 'object' && level > MAX_PROPERTY_LEVEL) {
    return getSchemaPropertyMaxLevelMeta(schema, key)
  }

  const component = getSchemaPropertyMetaComponent(property)

  if (component === null) {
    return
  }

  const options = getSchemaPropertyMetaOptions(property, schema, key)

  return { ...component, ...options }
}

function getSchemaPropertyMaxLevelMeta(property: SchemaProperty, schema: Schema, key: string): SchemaPropertyMeta | void {
  const component = withProps(JsonInput)
  const options = getSchemaPropertyMetaOptions({ type: undefined }, schema, key)

  options.attrs ??= {}
  options.attrs.placeholder ??= {}

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

function getSchemaPropertyMetaComponent(property: SchemaProperty): SchemaPropertyMetaComponent | null {
  if (property.blockReference) {
    return factory(BlockDocumentInput, {
      blockTypeSlug: property.blockReference.blockTypeSlug,
    })
  }

  switch (property.type) {
    case 'array':
      return getSchemaPropertyArrayMetaComponent(property)
    case 'string':
      return getSchemaPropertyStringMetaComponent(property)
    case 'integer':
    case 'number':
      return withProps(PNumberInput)
    case 'boolean':
      return withProps(PToggle)
    case undefined:
      return withProps(JsonInput)
    default:
      return null
  }
}

function getSchemaPropertyStringMetaComponent(property: SchemaProperty): SchemaPropertyMeta {
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

function getSchemaPropertyArrayMetaComponent(property: SchemaProperty): SchemaPropertyMeta {
  if (isStringArray(property.enum) || isNumberArray(property.enum)) {
    return withProps(PSelect, {
      options: property.enum,
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
    validators.push(withMessage(greaterThanOrEqual(greaterThanOrEqualValue), `${title} must be greater than or equal to ${property.minLength}`))
  }

  const lessThanOrEqualValue = property.maxLength ?? property.maximum ?? property.maxItems

  if (lessThanOrEqualValue !== undefined) {
    validators.push(withMessage(lessThanOrEqual(lessThanOrEqualValue), `${title} must be less than or equal to ${property.maxLength}`))
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

  if (property.default !== undefined) {
    attrs.placeholder = property.default
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

  return attrs
}