import { JsonInput } from '@/components'
import { getSchemaValueDefinition, schemaPropertyServiceFactory } from '@/services/schemas'
import { SchemaPropertyService } from '@/services/schemas/properties/SchemaPropertyService'
import { getSchemaPropertyDefaultValue, SchemaPropertyComponentWithProps } from '@/services/schemas/utilities'
import { SchemaValue } from '@/types/schemas'
import { isEmptyObject, sameValue } from '@/utilities'
import { jsonSafeParse } from '@/utilities/jsonSafeParse'
import { jsonSafeStringify } from '@/utilities/jsonSafeStringify'

export class SchemaPropertyAny extends SchemaPropertyService {
  protected get default(): unknown {
    let defaultValue: unknown = null

    if (this.has('default')) {
      defaultValue = this.property.default
    } else if (this.has('anyOf') || this.has('allOf')) {
      defaultValue = this.getDefaultValueForFirstDefinition()
    }

    if (this.componentIs(JsonInput)) {
      return jsonSafeStringify(defaultValue).value ?? ''
    }

    return defaultValue
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

    const { value: request } = jsonSafeParse(value)

    return request
  }

  protected response(value: SchemaValue): unknown {
    if (this.has('anyOf') || this.has('allOf')) {
      return this.referenceResponse(value)
    }

    const { value: response } = jsonSafeStringify(value)

    return response
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