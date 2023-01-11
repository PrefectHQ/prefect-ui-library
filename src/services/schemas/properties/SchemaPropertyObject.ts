import { JsonInput } from '@/components'
import { schemaPropertyServiceFactory } from '@/services/schemas/properties'
import { SchemaPropertyService } from '@/services/schemas/properties/SchemaPropertyService'
import { SchemaPropertyComponentWithProps } from '@/services/schemas/utilities'
import { SchemaValue, isSchemaValues, SchemaValues } from '@/types/schemas'
import { isEmptyObject, mapValues } from '@/utilities'
import { parseUnknownJson, stringifyUnknownJson } from '@/utilities/json'

export class SchemaPropertyObject extends SchemaPropertyService {

  protected override get component(): SchemaPropertyComponentWithProps {
    if (this.isMaxLevel) {
      return this.withProps(JsonInput)
    }

    if (this.has('properties')) {
      return null
    }

    return this.withProps(JsonInput)
  }

  protected get default(): unknown {
    if (this.isMaxLevel) {
      return ''
    }

    // some object properties don't have specific properties and a JsonInput is used
    if (!this.has('properties')) {
      return ''
    }

    return {}
  }

  protected request(value: SchemaValue): unknown {
    if (this.isMaxLevel) {
      return this.maxLevelRequestValue(value)
    }

    if (!this.has('properties')) {
      return parseUnknownJson(value)
    }

    if (!isSchemaValues(value)) {
      return undefined
    }

    const mapped = mapValues(this.property.properties, (key, property) => {
      const propertyValue = value[key]
      const service = schemaPropertyServiceFactory(property!, this.level + 1)

      return service.mapRequestValue(propertyValue)
    })

    if (isEmptyObject(mapped)) {
      return undefined
    }

    return mapped
  }

  protected response(value: SchemaValue): unknown {
    if (this.isMaxLevel) {
      return this.maxLevelResponseValue(value)
    }

    // if there are no nested properties a JsonInput is used
    if (!this.has('properties')) {
      return stringifyUnknownJson(value)
    }

    // just in case what we got from the api was a json string
    // apparently this isn't uncommon
    const parsed = (parseUnknownJson(value) ?? {}) as SchemaValues

    return mapValues(this.property.properties, (key, property) => {
      const propertyValue = parsed[key]
      const service = schemaPropertyServiceFactory(property!, this.level + 1)

      return service.mapResponseValue(propertyValue)
    })
  }

  private maxLevelRequestValue(value: SchemaValue): unknown {
    const mapped = parseUnknownJson(value)

    if (mapped === null || mapped === undefined) {
      return this.invalid()
    }

    return mapped
  }

  private maxLevelResponseValue(value: SchemaValue): unknown {
    const mapped = stringifyUnknownJson(value)

    if (mapped === null || mapped === undefined) {
      return this.invalid()
    }

    return mapped
  }

}