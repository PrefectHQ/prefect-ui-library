import { JsonInput } from '@/components'
import { isBlockDocumentReferenceValue, isBlockDocumentValue } from '@/models'
import { schemaPropertyServiceFactory } from '@/services/schemas/properties'
import { SchemaProperty, SchemaPropertyInputAttrs, Schema, SchemaValues, SchemaValue, schemaHas, SchemaPropertyAnyOf, SchemaPropertyAllOf } from '@/types/schemas'
import { isArray } from '@/utilities'
import { withPropsWithoutExcludedFactory } from '@/utilities/components'
import { stringify } from '@/utilities/json'
import { isRecord } from '@/utilities/object'
import { parseUnknownJson } from '@/utilities/parseUnknownJson'
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
export function getSchemaPropertyResponseValue(property: SchemaProperty, value: SchemaValue, level: number = 0): SchemaValue {
  const service = schemaPropertyServiceFactory(property, level)

  return service.mapResponseValue(value)
}

/*
 * Gets a api friendly version of a property's UI friendly value. Used for mapping.
 */
export function getSchemaPropertyRequestValue(property: SchemaProperty, value: SchemaValue, level: number = 0): SchemaValue {
  const service = schemaPropertyServiceFactory(property, level)

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

  return attrs
}

export function getSchemaPropertyPlaceholder(property: SchemaProperty): string | undefined {
  const placeholder = property.default ?? property.example ?? property.examples?.at(0)

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
        showLineNumbers: true,
        minLines: 3,
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
export function getSchemaValueDefinition(property: SchemaProperty, value: SchemaValue): Schema | null {
  if (property.anyOf) {
    return getSchemaValueAnyOfDefinition(property as SchemaPropertyAnyOf, value)
  }

  if (property.allOf) {
    return getSchemaValueAllOfDefinition(property as SchemaPropertyAllOf, value)
  }
  console.error('Schema property missing allOf and anyOf definitions', property, value)
  return null
}

/*
 * Sometimes we have to guess which schema an anyOf property is using
 */
export function getSchemaValueAnyOfDefinition(property: SchemaPropertyAnyOf, value: SchemaValue): Schema | null {
  const index = getSchemaValueAnyOfDefinitionIndex(property, value)

  if (index === null || index === -1) {
    console.log('Schema property with anyOf had a value but could not be associated with a definition', property, value)

    return null
  }

  return property.anyOf[index]
}

export function getSchemaValueAnyOfDefinitionIndex({ anyOf: definitions }: SchemaPropertyAnyOf, value: SchemaValue): number | null {
  return getSchemaValueDefinitionIndex(definitions, value)
}

/*
 * Sometimes we have to guess which schema an allOf property is using
 */
export function getSchemaValueAllOfDefinition(property: SchemaPropertyAllOf, value: SchemaValue): Schema | null {
  const index = getSchemaValueAllOfDefinitionIndex(property, value)

  if (index === null || index === -1) {
    console.log('Schema property with allOf had a value but could not be associated with a definition', property, value)

    return null
  }

  return property.allOf[index]
}

export function getSchemaValueAllOfDefinitionIndex({ allOf: definitions }: SchemaPropertyAllOf, value: SchemaValue): number | null {
  return getSchemaValueDefinitionIndex(definitions, value)
}

export function getSchemaValueDefinitionIndex(definitions: Schema[], value: SchemaValue): number | null {
  if (isBlockDocumentReferenceValue(value)) {
    return definitions.findIndex(definition => definition.type === 'block')
  }

  const parsedValue = parseUnknownJson(value)

  if (isRecord(parsedValue) || Array.isArray(parsedValue)) {
    return findObjectDefinitionIndex(definitions, parsedValue)
  }

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

  if (isBlockDocumentValue(value)) {
    return definitions.findIndex(definition => definition.blockTypeSlug === value.blockTypeSlug)
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
    const indexOfDefinitionWithAdditionalProperties = definitions.findIndex(definition => definition.additionalProperties)

    // Since we were unable to find a definition with a matching set of keys, we'll use the definition with additionalProperties if one exists.
    if (indexOfDefinitionWithAdditionalProperties !== -1) {
      return indexOfDefinitionWithAdditionalProperties
    }

    return null
  }

  return index
}