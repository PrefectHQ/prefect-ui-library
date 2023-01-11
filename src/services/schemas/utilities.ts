import { JsonInput } from '@/components'
import { schemaPropertyServiceFactory } from '@/services/schemas/properties'
import { SchemaProperty, SchemaPropertyInputAttrs, Schema, SchemaValues, SchemaValue, schemaHas, SchemaPropertyAnyOf } from '@/types/schemas'
import { withPropsWithoutExcludedFactory } from '@/utilities/components'
import { stringify } from '@/utilities/json'
import { isGreaterThan, isGreaterThanOrEqual, isLessThan, isLessThanOrEqual, isRequired, fieldRules, ValidationMethod, ValidationMethodFactory } from '@/utilities/validation'

export type SchemaPropertyComponentWithProps = ReturnType<typeof schemaPropertyComponentWithProps> | null

/*
 * Used for creating SchemaProperty meta. Defines the component and props necessary for rendering a SchemaProperty.
 */
export const schemaPropertyComponentWithProps = withPropsWithoutExcludedFactory('modelValue')

/*
 * Gets a UI friendly version of an empty value for a specific schema. Used for create forms that have no existing value.
 */
export function getSchemaDefaultValues(schema: Schema): SchemaValues {
  return getSchemaResponseValue(schema, {}) as SchemaValues
}


/*
 * Gets a UI friendly version of an empty value for a specific schema. Used for create forms that have no existing value.
 */
export function getSchemaPropertyDefaultValue(property: SchemaProperty, level: number = 0): SchemaValue {
  if (schemaHas(property, 'properties')) {
    return getSchemaPropertyResponseValue(property, {}) as SchemaValues
  }

  const service = schemaPropertyServiceFactory(property, level)

  return service.getDefaultValue()
}

/*
 * Gets a ui friendly version a schema's api friendly values. Used for mapping.
 */
export function getSchemaResponseValue(schema: Schema, values: SchemaValues): SchemaValues {
  return getSchemaPropertyResponseValue(schema, values) as SchemaValues
}

/*
 * Gets a api friendly version a schema's ui friendly values. Used for mapping.
 */
export function getSchemaRequestValue(schema: Schema, values: SchemaValues): SchemaValues {
  return (getSchemaPropertyRequestValue(schema, values) ?? {}) as SchemaValues
}

/*
 * Gets a UI friendly version of a property's api friendly value. Used for mapping.
 */
export function getSchemaPropertyResponseValue(property: SchemaProperty, value: SchemaValue): SchemaValue {
  const service = schemaPropertyServiceFactory(property, 0)

  return service.mapResponseValue(value)
}

/*
 * Gets a api friendly version of a property's UI friendly value. Used for mapping.
 */
export function getSchemaPropertyRequestValue(property: SchemaProperty, value: SchemaValue): SchemaValue {
  const service = schemaPropertyServiceFactory(property, 0)

  return service.mapRequestValue(value)
}

/*
 * Gets any attributes for a property that should be bound to the component used to edit a property.
 * Attrs are added to the property's meta in the meta resolver.
 */
export function getSchemaPropertyAttrs(property: SchemaProperty): SchemaPropertyInputAttrs {
  const attrs: SchemaPropertyInputAttrs = {
    autocomplete: 'off',
  }

  const placeholder = getSchemaPropertyPlaceholder(property)

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

  if (property.format === 'password') {
    attrs.type = 'password'
  }

  return attrs
}

export function getSchemaPropertyPlaceholder(property: SchemaProperty): string | undefined {
  const placeholder = property.default ?? property.example

  if (!placeholder) {
    return undefined
  }

  if (typeof placeholder === 'string') {
    return placeholder
  }

  return stringify(placeholder)
}

export function getSchemaPropertyComponentWithDefaultProps({ component, props }: NonNullable<SchemaPropertyComponentWithProps>): NonNullable<SchemaPropertyComponentWithProps> {
  switch (component) {
    case JsonInput:
      return schemaPropertyComponentWithProps(JsonInput, {
        showFormatButton: true,
        ...props,
      })
    default:
      return { component, props }
  }
}

/*
 * Gets any validation rules necessary for creating/updating a property in the ui.
 * Validators are added to the property's meta in the meta resolver.
 */
export function getSchemaPropertyDefaultValidators(property: SchemaProperty, required: boolean): ValidationMethod[] {
  const { title = 'Property' } = property
  const validators: ValidationMethodFactory[] = []

  const greaterThanOrEqualValue = property.minLength ?? property.minimum ?? property.minItems

  if (greaterThanOrEqualValue !== undefined) {
    validators.push(isGreaterThanOrEqual(greaterThanOrEqualValue))
  }

  const lessThanOrEqualValue = property.maxLength ?? property.maximum ?? property.maxItems

  if (lessThanOrEqualValue !== undefined) {
    validators.push(isLessThanOrEqual(lessThanOrEqualValue))
  }

  if (property.exclusiveMinimum !== undefined) {
    validators.push(isGreaterThan(property.exclusiveMinimum))
  }

  if (property.exclusiveMaximum !== undefined) {
    validators.push(isLessThan(property.exclusiveMaximum))
  }

  if (required) {
    validators.push(isRequired)
  }

  return fieldRules(title, ...validators)
}

export type ResolverCallback<T> = (schema: T) => T

/*
 * A utility for passing a value through an array of resolver methods.
 */
export function resolve<T>(value: T, resolvers: ResolverCallback<T>[]): T {
  return resolvers.reduce((resolved, resolver) => resolver(resolved), value)
}

/*
 * Sometimes we have to guess which schema an anyOf property is using
 */
export function getSchemaValueAnyOfDefinition(property: SchemaPropertyAnyOf, value: SchemaValue): Schema | null {
  const index = getSchemaValueAnyOfDefinitionIndex(property, value)

  if (index === null || index === -1) {
    console.warn('Schema property with anyOf had a value but could not be associated with a definition')

    return null
  }

  return property.anyOf[index]
}

export function getSchemaValueAnyOfDefinitionIndex({ anyOf: definitions }: SchemaPropertyAnyOf, value: SchemaValue): number | null {
  switch (typeof value) {
    case 'number':
      return definitions.findIndex(definition => definition.type == 'number' || definition.type === 'integer')
    case 'string':
      return definitions.findIndex(definition => definition.type == 'string')
    case 'boolean':
      return definitions.findIndex(definition => definition.type == 'boolean')
    case 'object':
      return findObjectDefinitionIndex(definitions, value)
    default:
      return null
  }
}

function findObjectDefinitionIndex(definitions: Schema[], value: object | null): number | null {
  if (value === null) {
    return null
  }

  if (Array.isArray(value)) {
    return definitions.findIndex(definition => definition.type === 'array')
  }

  const valueKeys = Object.keys(value)

  if (valueKeys.length === 0) {
    return definitions.findIndex(definition => definition.type === 'object')
  }

  const [index, keysInCommon] = definitions.reduce<[number, number]>(([resultIndex, resultKeysInCommon], definition, definitionIndex) => {
    const definitionKeys = Object.keys(definition.properties ?? {})
    const definitionKeysInCommon = valueKeys.filter(value => definitionKeys.includes(value)).length

    if (definitionKeysInCommon > resultKeysInCommon) {
      return [definitionIndex, definitionKeysInCommon]
    }

    return [resultIndex, resultKeysInCommon]
  }, [0, 0])

  if (keysInCommon === 0) {
    return null
  }

  return index
}