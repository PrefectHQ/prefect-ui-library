import { getSchemaPropertyResponseValue, getSchemaValueDefinition, schemaPropertyServiceFactory } from '..'
import { JsonInput } from '@/components'
import { isBlockDocumentValue } from '@/models'
import { SchemaPropertyService } from '@/services/schemas/properties/SchemaPropertyService'
import { getSchemaPropertyDefaultValue, SchemaPropertyComponentWithProps } from '@/services/schemas/utilities'
import { SchemaValue } from '@/types/schemas'
import { isEmptyObject, sameValue } from '@/utilities'
import { parseUnknownJson, stringifyUnknownJson } from '@/utilities/json'

export class SchemaPropertyAny extends SchemaPropertyService {
  protected get default(): unknown {
    if (this.has('default')) {
      console.log(this.property.title, this.property, this.property.default)
      return this.property.default
      // return getSchemaPropertyResponseValue(this.property, this.property.default, this.level + 1)
    }

    if (this.componentIs(JsonInput)) {
      return ''
    }

    if (this.has('anyOf') || this.has('allOf')) {
      return this.getDefaultValueForFirstDefinition()
    }

    return null
  }

  protected get component(): SchemaPropertyComponentWithProps {
    // if either of these exist let the AnyOf and AllOf components take over
    if (this.has('anyOf') || this.has('allOf')) {
      return null
    }

    return this.withProps(JsonInput)
  }

  protected request(value: SchemaValue): unknown {
    if (this.has('anyOf') || this.has('allOf')) {
      return this.referenceRequest(value)
    }

    return parseUnknownJson(value)
  }

  protected response(value: SchemaValue): unknown {
    if (this.has('anyOf') || this.has('allOf')) {
      return this.referenceResponse(value)
    }

    return stringifyUnknownJson(value)
  }

  private referenceResponse(value: SchemaValue): SchemaValue {
    if (value === undefined) {
      return this.invalid()
    }

    const definition = getSchemaValueDefinition(this.property, value)

    if (definition === null) {
      return this.invalid()
    }

    const service = schemaPropertyServiceFactory(definition, this.level)
    const mapped = service.mapResponseValue(value)

    return mapped

  }

  private referenceRequest(value: SchemaValue): SchemaValue {
    if (this.isDefaultValueForReference(value)) {
      return undefined
    }

    const definition = getSchemaValueDefinition(this.property, value)

    if (definition === null) {
      return value
    }

    const service = schemaPropertyServiceFactory(definition, this.level)
    const mapped = service.mapRequestValue(value)

    if (isEmptyObject(mapped)) {
      return undefined
    }

    return mapped

  }

  private getDefaultValueForFirstDefinition(): SchemaValue {
    const [firstDefinition] = this.property.anyOf ?? this.property.allOf ?? []

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (firstDefinition) {
      return getSchemaPropertyDefaultValue(firstDefinition)
    }

    throw new Error('Could not find first definition for schema property')
  }

  private isDefaultValueForReference(value: SchemaValue): boolean {
    const definitions = this.property.anyOf ?? this.property.allOf ?? []

    return definitions.some(definition => sameValue(value, getSchemaPropertyDefaultValue(definition)))
  }

}