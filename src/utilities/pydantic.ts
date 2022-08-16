import { PTextInput, PToggle, PTextarea, PDateInput, PNumberInput, PCombobox, PSelect } from '@prefecthq/prefect-design'
import JsonInput from '@/components/JsonInput.vue'
import { ValidateMethod, isEmail, greaterThanOrEqual, greaterThan, lessThan, lessThanOrEqual, isRequired, withMessage } from '@/services'
import { isSchemaStringFormat, isSchemaType, Schema, SchemaEnum, SchemaStringFormat, SchemaType } from '@/types/schemas'

const InputComponents = [PToggle, PTextInput, PTextarea, JsonInput, PDateInput, PNumberInput, PCombobox, PSelect] as const

export type PydanticTypeDefinitionComponentAttrs = Record<string, unknown>
export type PydanticTypeDefinitionComponent = {
  attrs: PydanticTypeDefinitionComponentAttrs,
  component?: typeof InputComponents[number],
  defaultValue?: unknown,
  validators: ValidateMethod[],
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
      component.validators = [isEmail]
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

const getValidateMethods = (schema: Schema): ValidateMethod[] => {
  const validators: ValidateMethod[] = []

  if (schema.minLength !== undefined) {
    validators.push(greaterThanOrEqual(schema.minLength))
  }

  if (schema.maxLength !== undefined) {
    validators.push(lessThanOrEqual(schema.maxLength))
  }

  if (schema.minimum !== undefined || schema.exclusiveMinimum !== undefined) {
    validators.push(greaterThan(schema.minimum ?? schema.exclusiveMinimum))
  }

  if (schema.maximum !== undefined || schema.exclusiveMaximum !== undefined) {
    validators.push(lessThan(schema.maximum ?? schema.exclusiveMaximum))
  }

  if (schema.minItems !== undefined) {
    validators.push(greaterThanOrEqual(schema.minItems))
  }

  if (schema.maxItems !== undefined) {
    validators.push(lessThanOrEqual(schema.maxItems))
  }

  if (schema.required !== undefined) {
    validators.push(withMessage(isRequired, 'Required'))
  }

  return validators
}

const getAttrs = (schema: Schema): PydanticTypeDefinitionComponentAttrs => {
  const attrs: PydanticTypeDefinitionComponentAttrs = {}

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
    const component = getBaseToggleInput()
    return component
  }

  if (isSchemaType('number', type) || isSchemaType('integer', type)) {
    const component = getBaseNumberInput()
    return component
  }

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

  return getBaseTextInput()
}

export const getComponentFromPydanticTypeDefinition = (schema: Schema): null | PydanticTypeDefinitionComponent => {
  const component = getBaseComponent(schema)

  if (!component) {
    return null
  }

  component.validators = getValidateMethods(schema)
  component.attrs = { ...component.attrs, ...getAttrs(schema) }

  if (schema.default !== undefined) {
    component.defaultValue = schema.default
  }

  return component
}