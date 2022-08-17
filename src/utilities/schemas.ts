import { PTextInput, PToggle, PTextarea, PDateInput, PNumberInput, PCombobox, PSelect } from '@prefecthq/prefect-design'
import { isNumberArray, isStringArray } from './arrays'
import JsonInput from '@/components/JsonInput.vue'
import { isEmail, greaterThanOrEqual, greaterThan, lessThan, lessThanOrEqual, isRequired, withMessage, ValidationRule } from '@/services'
import { Schema, schemaHas, SchemaProperty } from '@/types/schemas'

const components = [PToggle, PTextInput, PTextarea, JsonInput, PDateInput, PNumberInput, PCombobox, PSelect] as const
type Component = typeof components[number]

type SchemaPropertyInputAttrs = Record<string, unknown>

export type SchemaPropertyMeta = SchemaPropertyMetaComponent & SchemaPropertyMetaOptions

type SchemaPropertyMetaComponent<T extends Component = Component> = {
  component: T,
  props: Omit<InstanceType<T>['$props'], 'modelValue'>,
}

type SchemaPropertyMetaOptions = {
  attrs?: SchemaPropertyInputAttrs,
  validators?: ValidationRule | ValidationRule[],
  required?: boolean,
}

function factory<T extends Component>(component: T, props: SchemaPropertyMetaComponent<T>['props']): SchemaPropertyMetaComponent<T> {
  return {
    component,
    props,
  }
}

export function getSchemaPropertyMeta(property: SchemaProperty, schema: SchemaProperty, key: string): SchemaPropertyMeta | void {
  if (property.type === 'object') {
    return
  }

  const component = getSchemaPropertyMetaComponent(property)

  if (component === null) {
    return
  }

  const options = getSchemaPropertyMetaOptions(property, schema, key)

  return { ...component, ...options }
}

function getSchemaPropertyMetaOptions(property: SchemaProperty, schema: Schema, key: string): SchemaPropertyMetaOptions {
  return {
    validators: getSchemaPropertyValidators(property, schema, key),
    required: getSchemaPropertyIsRequired(schema, key),
    attrs: getSchemaPropertyAttrs(property),
  }
}

function getSchemaPropertyMetaComponent(property: SchemaProperty): SchemaPropertyMetaComponent | null {
  switch (property.type) {
    case 'array':
      return getSchemaPropertyArrayMeta(property)
    case 'string':
      return getSchemaPropertyStringMeta(property)
    case 'integer':
    case 'number':
      return factory(PNumberInput, {})
    case 'boolean':
      return factory(PToggle, {})
    case undefined:
      return factory(JsonInput, {})
    default:
      return null
  }
}

function getSchemaPropertyStringMeta(property: SchemaProperty): SchemaPropertyMeta {
  switch (property.format) {
    case 'date':
      return factory(PDateInput, {})
    case 'date-time':
      return factory(PDateInput, { showTime: true })
    case 'json-string':
      return factory(JsonInput, {})
    case 'time-delta':
      return factory(PNumberInput, {})
    default:
      return factory(PTextInput, {})
  }
}

function getSchemaPropertyArrayMeta(property: SchemaProperty): SchemaPropertyMeta {
  if (isStringArray(property.enum) || isNumberArray(property.enum)) {
    return factory(PSelect, {
      options: property.enum,
    })
  }

  if (schemaHas(property, 'items') && property.items.type !== 'string') {
    return factory(JsonInput, {})
  }

  return factory(PCombobox, { options: [], allowUnknownValue: true })
}

function getSchemaPropertyValidators(property: SchemaProperty, schema: Schema, key: string): ValidationRule[] {
  const { title = 'Property' } = property
  const validators: ValidationRule[] = []

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

  if (property.type === 'string') {
    if (property.format === 'email') {
      validators.push(withMessage(isEmail, `${title} must be a valid email address`))
    }
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