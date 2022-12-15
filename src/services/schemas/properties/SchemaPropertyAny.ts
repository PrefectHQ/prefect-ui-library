import { schemaPropertyServiceFactory } from '..'
import { JsonInput } from '@/components'
import { SchemaPropertyService } from '@/services/schemas/properties/SchemaPropertyService'
import { getSchemaValueAnyOfDefinition, getSchemaPropertyDefaultValue, SchemaPropertyComponentWithProps } from '@/services/schemas/utilities'
import { SchemaValue } from '@/types/schemas'
import { isEmptyObject, sameValue } from '@/utilities'
import { parseUnknownJson, stringifyUnknownJson } from '@/utilities/json'

export class SchemaPropertyAny extends SchemaPropertyService {
  protected get default(): unknown {
    if (this.componentIs(JsonInput)) {
      return ''
    }

    if (this.has('anyOf')) {
      return this.getDefaultValueForFirstAnyOfDefinition()
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
    if (this.has('anyOf')) {
      return this.anyOfRequest(value)
    }

    return parseUnknownJson(value)
  }

  protected response(value: SchemaValue): unknown {
    if (this.has('anyOf')) {
      return this.anyOfResponse(value)
    }

    return stringifyUnknownJson(value)
  }

  private anyOfResponse(value: SchemaValue): SchemaValue {
    if (!this.has('anyOf')) {
      return value
    }

    if (value === undefined) {
      return this.invalid()
    }

    const definition = getSchemaValueAnyOfDefinition(this.property, value)

    if (definition === null) {
      return this.invalid()
    }

    const service = schemaPropertyServiceFactory(definition, this.level)
    const mapped = service.mapResponseValue(value)

    return mapped

  }

  private anyOfRequest(value: SchemaValue): SchemaValue {
    if (!this.has('anyOf')) {
      return value
    }

    if (this.isDefaultValueForAnyOf(value)) {
      return undefined
    }

    const definition = getSchemaValueAnyOfDefinition(this.property, value)

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

  private getDefaultValueForFirstAnyOfDefinition(): SchemaValue {
    const [firstDefinition] = this.property.anyOf!

    return getSchemaPropertyDefaultValue(firstDefinition)
  }

  private isDefaultValueForAnyOf(value: SchemaValue): boolean {
    if (!this.has('anyOf')) {
      return false
    }

    return this.property.anyOf.some(definition => sameValue(value, getSchemaPropertyDefaultValue(definition)))
  }

}