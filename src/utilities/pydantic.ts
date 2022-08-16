import { PTextInput, PToggle, PTextarea, PDateInput, PNumberInput, PCombobox, PSelect } from '@prefecthq/prefect-design'
import JsonInput from '@/components/JsonInput.vue'
import { isEmail, greaterThanOrEqual, greaterThan, lessThan, lessThanOrEqual, isRequired, withMessage, ValidationRule } from '@/services'
import { isSchemaStringFormat, isSchemaType, Schema, SchemaEnum, SchemaProperty, SchemaStringFormat, SchemaType } from '@/types/schemas'

const components = [PToggle, PTextInput, PTextarea, JsonInput, PDateInput, PNumberInput, PCombobox, PSelect] as const
type Component = typeof components[number]

type SchemaPropertyInputAttrs = Record<string, unknown>

export type SchemaPropertyInput<T extends Component> = {
  component: T,
  props: Omit<InstanceType<T>['$props'], 'modelValue'>,
  attrs?: SchemaPropertyInputAttrs,
  validators?: ValidationRule | ValidationRule[],
  required?: boolean,
}

function factory<T extends Component>(component: T, options: Omit<SchemaPropertyInput<T>, 'component'>): SchemaPropertyInput<T> {
  return {
    component,
    ...options,
  }
}

const test = factory(PToggle, {
  props: {
    disabled: true,
  },
})


const getValidateMethods = (property: SchemaProperty): ValidationRule[] => {
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

  // Is this even correct? Just because the required property exists doesn't mean this property is required.
  // It means one of its properties is. Which I guess means this is too? Hmmm...
  if (property.required !== undefined) {
    validators.push(withMessage(isRequired, `${title} is required`))
  }

  if (property.type === 'string') {
    if (property.format === 'email') {
      validators.push(withMessage(isEmail, `${title} must be a valid email address`))
    }
  }

  return validators
}

// should this be type specific? Some of these are props too. Hmmmm....
const getAttrs = (schema: Schema): SchemaPropertyInputAttrs => {
  const attrs: SchemaPropertyInputAttrs = {}

  if (schema.minLength !== undefined || schema.minimum !== undefined) {
    attrs.min = schema.minLength ?? schema.minimum
  }

  if (schema.maxLength !== undefined || schema.maximum !== undefined) {
    attrs.max = schema.maxLength ?? schema.maximum
  }

  if (schema.multipleOf) {
    attrs.step = schema.multipleOf
  }

  return attrs
}

//
//
//
//
//

export type PydanticTypeDefinitionComponentAttrs = Record<string, unknown>
export type PydanticTypeDefinitionComponent = {
  attrs: PydanticTypeDefinitionComponentAttrs,
  component?: Component,
  defaultValue?: unknown,
  validators: ValidationRule[],
  slots?: Record<string, unknown>,
}

interface BaseJsonInput extends PydanticTypeDefinitionComponent {
  component: typeof JsonInput,
  defaultValue?: string,
}

interface BaseTextInput extends PydanticTypeDefinitionComponent {
  attrs: {
    type: 'text',
  },
  component: typeof PTextInput,
  defaultValue?: string,
}

interface BaseToggleInput extends PydanticTypeDefinitionComponent {
  component: typeof PToggle,
  defaultValue?: boolean,
}

interface BaseNumberInput extends PydanticTypeDefinitionComponent {
  attrs: {
    min?: number | string,
    max?: number | string,
    step?: number | string,
  },
  component: typeof PNumberInput,
  defaultValue?: number,
}

interface BaseEnumInput extends PydanticTypeDefinitionComponent {
  attrs: {
    multiple: boolean,
    options: SchemaEnum<unknown>,
  },
  component: typeof PSelect,
  defaultValue?: unknown,
}

interface BaseListInput extends PydanticTypeDefinitionComponent {
  attrs: {
    allowUnknownValue: boolean,
    multiple: boolean,
    options: SchemaEnum<unknown>,
  },
  component: typeof PCombobox,
  defaultValue?: unknown[],
}

interface BaseDateInput extends PydanticTypeDefinitionComponent {
  attrs: {
    showTime: boolean,
  },
  component: typeof PDateInput,
  defaultValue?: Date,
}

const getBaseJsonInput = (): BaseJsonInput => {
  return {
    attrs: {},
    component: JsonInput,
    validators: [],
  }
}

const getBaseTextInput = (): BaseTextInput => {
  return {
    attrs: {
      type: 'text',
    },
    component: PTextInput,
    validators: [],
  }
}

const getBaseToggleInput = (): BaseToggleInput => {
  return {
    attrs: {},
    component: PToggle,
    slots: {
      append: 'True',
      prepend: 'False',
    },
    validators: [],
  }
}

const getBaseNumberInput = (): BaseNumberInput => {
  return {
    attrs: {},
    component: PNumberInput,
    validators: [],
  }
}

const getBaseEnumInput = (): BaseEnumInput => {
  return {
    attrs: {
      multiple: false,
      options: [],
    },
    component: PSelect,
    validators: [],
  }
}

const getBaseListInput = (): BaseListInput => {
  return {
    attrs: {
      allowUnknownValue: true,
      multiple: true,
      options: [],
    },
    component: PCombobox,
    validators: [],
  }
}

const getBaseDateInput = (): BaseDateInput => {
  return {
    attrs: {
      showTime: false,
    },
    component: PDateInput,
    validators: [],
  }
}

const getStringFormattedComponent = (format: SchemaStringFormat): PydanticTypeDefinitionComponent => {
  let component

  switch (format) {
    case 'date':
      component = getBaseDateInput()
      break
    case 'date-time':
      component = getBaseDateInput()
      component.attrs = {
        showTime: true,
      }
      break
    case 'regex':
      component = getBaseTextInput()
      break
    case 'email':
      component = getBaseTextInput()
      // component.validators = [isEmail]
      break
    case 'json-string':
      component = getBaseJsonInput()
      break
    case 'time-delta':
      component = getBaseNumberInput()
      break
  }

  return component
}

const getBaseComponent = (schema: Schema): null | PydanticTypeDefinitionComponent => {
  const { type, format, enum: defEnum, items } = schema

  if (schema.enum !== undefined) {
    const component = getBaseEnumInput()
    component.attrs.options = defEnum as SchemaEnum<SchemaType>

    if (isSchemaType('array', type)) {
      // Make sure this passes the default value as an array
      component.attrs.multiple = true
      component.defaultValue = []
    }

    return component
  }

  if (isSchemaType('string', type)) {
    let component
    if (isSchemaStringFormat(format)) {
      component = getStringFormattedComponent(format)
    } else {
      component = getBaseTextInput()
    }

    return component
  }

  if (isSchemaType('boolean', type)) {
    return getBaseToggleInput()
  }

  if (isSchemaType('number', type) || isSchemaType('integer', type)) {
    return getBaseNumberInput()
  }

  // array type needs to be smarter and check what property.items is
  // property.items.type ===
  // 'string' -> combobox
  // 'object' -> JSON?
  // 'number' -> combobox but with a validator? If so we'll need a parser in the request mapper for SchemaValues
  if (isSchemaType('array', type)) {
    const component = getBaseListInput()
    component.attrs.multiple = true
    component.defaultValue = []

    // TODO: This probably isn't robust to all predefined item types.
    if (items) {
      if (Array.isArray(items)) {
        // Check that the default value is an array
        component.attrs.options = items
      } else if (items.enum !== undefined) {
        component.attrs.options = items.enum as SchemaEnum<SchemaType>
      }
    } else {
      component.attrs.allowUnknownValue = true
    }

    return component
  }

  if (isSchemaType('object', type)) {
    const component = getBaseJsonInput()
    return component
  }

  if (isSchemaType('null', type)) {
    return null
  }

  return getBaseJsonInput()
}

export const getComponentFromPydanticTypeDefinition = (property: SchemaProperty): null | PydanticTypeDefinitionComponent => {
  const component = getBaseComponent(property)

  if (!component) {
    return null
  }

  component.validators = getValidateMethods(property)
  component.attrs = { ...component.attrs, ...getAttrs(property) }

  if (property.default !== undefined) {
    component.defaultValue = property.default
  }

  return component
}