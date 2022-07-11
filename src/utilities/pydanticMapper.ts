
import { PTextInput, PToggle, PTextarea, PDateInput, PNumberInput, PCombobox, PSelect } from '@prefecthq/prefect-design'
import JsonEditor from '@/components/JsonEditor.vue'
import { ValidateMethod, isEmail, greaterThanOrEqual, greaterThan, lessThan, lessThanOrEqual } from '@/services'
import {
  hasDefinitions,
  hasExclusiveMax,
  hasExclusiveMin,
  hasMax,
  hasMaxItems,
  hasMaxLength,
  hasMin,
  hasMinItems,
  hasMinLength,
  hasMultipleOf,
  hasProperties,
  hasTypeRef,
  isPydanticEnum,
  isPydanticStringFormat,
  isPydanticType,
  isPydanticTypeRef,
  PydanticEnum,
  PydanticStringFormat,
  PydanticType,
  PydanticTypeDefinition,
  PydanticTypeProperty,
  PydanticTypeRef,
  RefStringRegExp
} from '@/types/Pydantic'

const InputComponents = [PToggle, PTextInput, PTextarea, JsonEditor, PDateInput, PNumberInput, PCombobox, PSelect] as const

export type PydanticTypeDefinitionComponentAttrs = Record<string, unknown>
export type PydanticTypeDefinitionComponent = {
  attrs: PydanticTypeDefinitionComponentAttrs,
  component?: typeof InputComponents[number],
  defaultValue: unknown,
  validators: ValidateMethod[],
  slots?: Record<string, unknown>,
}

interface BaseJsonInput extends PydanticTypeDefinitionComponent {
  component: typeof JsonEditor,
  defaultValue: string,
}

interface BaseTextInput extends PydanticTypeDefinitionComponent {
  attrs: {
    type: 'text',
  },
  component: typeof PTextInput,
  defaultValue: string,
}

interface BaseToggleInput extends PydanticTypeDefinitionComponent {
  component: typeof PToggle,
  defaultValue: boolean,
}

interface BaseNumberInput extends PydanticTypeDefinitionComponent {
  attrs: {
    min?: number | string,
    max?: number | string,
    step?: number | string,
  },
  component: typeof PNumberInput,
  defaultValue: number,
}

interface BaseEnumInput extends PydanticTypeDefinitionComponent {
  attrs: {
    multiple: boolean,
    options: PydanticEnum<unknown>,
  },
  component: typeof PSelect,
  defaultValue: unknown[],
}

interface BaseListInput extends PydanticTypeDefinitionComponent {
  attrs: {
    allowUnknownValue: boolean,
    multiple: boolean,
    options: PydanticEnum<unknown>,
  },
  component: typeof PCombobox,
  defaultValue: unknown[],
}

interface BaseDateInput extends PydanticTypeDefinitionComponent {
  attrs: {
    showTime: boolean,
  },
  component: typeof PDateInput,
  defaultValue: Date,
}

const getBaseJsonInput = (): BaseJsonInput => {
  return {
    attrs: {},
    component: JsonEditor,
    defaultValue: '',
    validators: [],
  }
}

const getBaseTextInput = (): BaseTextInput => {
  return {
    attrs: {
      type: 'text',
    },
    defaultValue: '',
    component: PTextInput,
    validators: [],
  }
}

const getBaseToggleInput = (): BaseToggleInput => {
  return {
    attrs: {},
    component: PToggle,
    defaultValue: false,
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
    defaultValue: 0,
    validators: [],
  }
}

const getBaseEnumInput = (): BaseEnumInput => {
  return {
    attrs: {
      multiple: false,
      options: [] as PydanticEnum<unknown>,
    },
    component: PSelect,
    defaultValue: [],
    validators: [],
  }
}

const getBaseListInput = (): BaseListInput => {
  return {
    attrs: {
      allowUnknownValue: true,
      multiple: true,
      options: [] as PydanticEnum<unknown>,
    },
    component: PCombobox,
    defaultValue: [],
    validators: [],
  }
}

const getBaseDateInput = (): BaseDateInput => {
  return {
    attrs: {
      showTime: false,
    },
    component: PDateInput,
    defaultValue: new Date(),
    validators: [],
  }
}

const getStringFormattedComponent = (format: PydanticStringFormat): PydanticTypeDefinitionComponent => {
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

const getValidators = (definition: PydanticTypeDefinition): ValidateMethod[] => {
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

const getAttrs = (definition: PydanticTypeDefinition): PydanticTypeDefinitionComponentAttrs => {
  const attrs: PydanticTypeDefinitionComponentAttrs = {}

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

const getBaseComponent = (definition: PydanticTypeDefinition): null | PydanticTypeDefinitionComponent => {
  const { type, format, enum: defEnum } = definition

  if (isPydanticEnum(definition)) {
    const component = getBaseEnumInput()
    component.attrs.options = defEnum as PydanticEnum<PydanticType>

    if (isPydanticType('array', type)) {
      component.attrs.multiple = true
    }

    return component
  }

  if (isPydanticType('string', type)) {
    let component
    if (isPydanticStringFormat(format)) {
      component = getStringFormattedComponent(format)
    } else {
      component = getBaseTextInput()
    }

    return component
  }

  if (isPydanticType('boolean', type)) {
    const component = getBaseToggleInput()
    return component
  }

  if (isPydanticType('number', type) || isPydanticType('integer', type)) {
    const component = getBaseNumberInput()
    return component
  }

  if (isPydanticType('array', type)) {
    const component = getBaseListInput()
    component.attrs.allowUnknownValue = true
    component.attrs.multiple = true

    return component
  }

  if (isPydanticType('object', type)) {
    const component = getBaseJsonInput()
    return component
  }

  if (isPydanticType('null', type)) {
    return null
  }

  return getBaseTextInput()
}

export const getTypeDefinitionFromTypeRef = (ref: PydanticTypeRef<string>, definition: PydanticTypeDefinition): PydanticTypeDefinition | undefined => {
  if (!isPydanticTypeRef(ref)) {
    return
  }

  const extractedType = ref.match(RefStringRegExp)?.[1]

  if (!extractedType) {
    return
  }

  return definition.definitions?.[extractedType]
}

export const getComponentFromPydanticTypeDefinition = (definition: PydanticTypeDefinition): null | PydanticTypeDefinitionComponent => {
  const component = getBaseComponent(definition)

  if (!component) {
    return null
  }

  component.validators = getValidators(definition)
  component.attrs = { ...component.attrs, ...getAttrs(definition) }

  return component
}

export const getComponentFromPydanticProperty = (property: PydanticTypeProperty, schema: PydanticTypeDefinition): PydanticTypeDefinitionComponent | null => {
  let definition

  if (hasTypeRef(property)) {
    const definition_ = getTypeDefinitionFromTypeRef(property.$ref, schema)
    definition = { ...definition_, ...property }
  } else {
    definition = property
  }

  return getComponentFromPydanticTypeDefinition(definition)
}

export const normalizePydanticTypeDefinitionProperties = (schema: PydanticTypeDefinition): PydanticTypeDefinition => {
  if (hasProperties(schema)) {
    Object.keys(schema.properties).forEach(key => schema.properties[key].id = key)
  }

  if (hasDefinitions(schema)) {
    Object.keys(schema.definitions).forEach(key => {
      schema.definitions[key] = normalizePydanticTypeDefinitionProperties(schema.definitions[key])
      schema.definitions[key].id = key
    })
  }

  return schema
}