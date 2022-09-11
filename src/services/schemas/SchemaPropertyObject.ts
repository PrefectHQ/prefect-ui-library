import { PropertyComponentWithProps, SchemaPropertyService, SchemaPropertyServiceSource } from './SchemaPropertyService'
import { SchemaService } from './SchemaService'
import { JsonInput } from '@/components'
import { SchemaValue, isSchemaValues, SchemaValues } from '@/types/schemas'
import { mapEntries } from '@/utilities'
import { parseUnknownJson, stringifyUnknownJson } from '@/utilities/json'

export class SchemaPropertyObject extends SchemaPropertyService {

  private readonly schemaService: SchemaService

  public constructor(source: SchemaPropertyServiceSource) {
    super(source)

    this.schemaService = new SchemaService({
      initialPropertyLevel: source.level,
      maxPropertyLevel: source.maxPropertyLevel,
    })
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

      return this.schemaService.mapPropertyRequestValue(property, propertyValue)
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

      return this.schemaService.mapPropertyResponseValue(property, propertyValue)
    })
  }

  public get default(): unknown {
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

  public override get component(): PropertyComponentWithProps {
    if (this.has('properties')) {
      return null
    }

    return this.withProps(JsonInput)
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