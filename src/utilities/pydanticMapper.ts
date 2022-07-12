import { PTextInput, PToggle, PTextarea, PDateInput, PNumberInput, PCombobox, PSelect } from '@prefecthq/prefect-design'
import JsonEditor from '@/components/JsonEditor.vue'
import { ValidateMethod, isEmail, greaterThanOrEqual, greaterThan, lessThan, lessThanOrEqual } from '@/services'
import {
  hasAllOf,
  hasAnyOf,
  hasExclusiveMax,
  hasExclusiveMin,
  hasMax,
  hasMaxItems,
  hasMaxLength,
  hasMin,
  hasMinItems,
  hasMinLength,
  hasMultipleOf,
  hasItems,
  hasProperties,
  hasTypeRef,
  isPydanticEnum,
  isPydanticStringFormat,
  isPydanticType,
  PydanticEnum,
  PydanticStringFormat,
  PydanticType,
  PydanticTypeDefinition,
  PydanticTypeProperty,
  PydanticPropertiesMap,
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
  const { type, format, enum: defEnum, items } = definition

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
    component.attrs.multiple = true

    // TODO: This probably isn't robust to all predefined item types.
    if (items) {
      if (Array.isArray(items)) {
        component.attrs.options = items
      } else if (isPydanticEnum(items)) {
        component.attrs.options = items.enum as PydanticEnum<PydanticType>
      }
    } else {
      component.attrs.allowUnknownValue = true
    }

    return component
  }

  if (isPydanticType('object', type)) {
    const component = getBaseJsonInput()
    return component
  }

  if (isPydanticType('null', type)) {
    return null
  }

  return getBaseJsonInput()
}

export const getTypeDefinitionFromTypeRef = (ref: PydanticTypeRef<string>, definition: PydanticTypeDefinition): PydanticTypeDefinition | undefined => {
  const extractedType = ref.match(RefStringRegExp)?.[1]

  if (!extractedType) {
    return
  }

  const resolvedDefinition = definition.definitions?.[extractedType]

  return resolvedDefinition
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

export const getDefaultForProperty = (definition: PydanticTypeDefinition): unknown => {
  if (definition.default) {
    return definition.default
  }

  let defaultValue

  switch (definition.type) {
    case 'array':
      defaultValue = []
      break
    case 'string':
      defaultValue = ''
      break
    case 'boolean':
      defaultValue = false
      break
    case 'integer':
    case 'number':
      defaultValue = definition.minimum ?? 0
      break
    case 'null':
      defaultValue = null
      break
    case 'object':
      defaultValue = {}
      break
    default:
      break
  }

  return defaultValue
}

export const getResolvedTypeDefinitionFromProperty = (property: PydanticTypeProperty, schema: PydanticTypeDefinition): PydanticTypeProperty => {
  let definition: PydanticTypeProperty = {}

  if (hasTypeRef(property)) {
    const _definition = getTypeDefinitionFromTypeRef(property.$ref, schema)
    definition = { ..._definition }
  }

  if (hasAllOf(property)) {
    definition.allOf = property.allOf.map((_property) => getResolvedTypeDefinitionFromProperty(_property, schema))
  }

  if (hasAnyOf(property)) {
    definition.anyOf = property.anyOf.map((_property) => getResolvedTypeDefinitionFromProperty(_property, schema))
  }

  if (hasItems(property)) {
    if (Array.isArray(property.items)) {
      definition.items = property.items.map((_property) => getResolvedTypeDefinitionFromProperty(_property, schema))
    } else {
      definition.items = getResolvedTypeDefinitionFromProperty(property.items, schema)
    }
  }

  if (hasProperties(definition)) {
    Object.entries(definition.properties).forEach(([key, property]) => {
      definition.properties![key] = getResolvedTypeDefinitionFromProperty(property, schema)
    })
  }

  definition = { ...property, ...definition }

  return definition
}

export class PydanticSchema {
  private readonly rawSchema: PydanticTypeDefinition
  private readonly _properties: PydanticPropertiesMap

  public constructor(schema: PydanticTypeDefinition) {
    this.rawSchema = schema
    this._properties = this.definePropertyDefinitions(schema.properties)
  }

  public get properties(): Record<string, PydanticTypeProperty> {
    return this._properties
  }

  public get definitions(): Record<string, PydanticTypeDefinition> {
    return this.rawSchema.definitions ?? {}
  }

  private definePropertyDefinitions(properties: PydanticPropertiesMap = {}): PydanticPropertiesMap {
    const definedProperties = { ...properties }

    Object.entries(properties).forEach(([key, property]) => {
      const definition = getResolvedTypeDefinitionFromProperty(property, this.rawSchema)
      definedProperties[key] = definition
    })

    return definedProperties
  }
}
