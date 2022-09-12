import { SchemaPropertyComponentWithProps } from '../utilities'
import { SchemaPropertyService } from './SchemaPropertyService'
import { JsonInput } from '@/components'
import { schemaPropertyServiceFactory } from '@/services/schemas/properties'
import { SchemaValue, isSchemaValues, SchemaValues } from '@/types/schemas'
import { mapEntries } from '@/utilities'
import { parseUnknownJson, stringifyUnknownJson } from '@/utilities/json'

export class SchemaPropertyObject extends SchemaPropertyService {

  protected override get component(): SchemaPropertyComponentWithProps {
    if (this.has('properties')) {
      return null
    }

    return this.withProps(JsonInput)
  }

  protected get default(): unknown {
    // JsonInput is used when max level is reached
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

    return mapEntries(this.property.properties, (key, property) => {
      const propertyValue = value[key]
      const service = schemaPropertyServiceFactory(property!, this.level + 1)

      return service.mapRequestValue(propertyValue)
    })
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

    // TODO: I'm not 100% sure this works with nested properties. Need to test
    return mapEntries(this.property.properties, (key, property) => {
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