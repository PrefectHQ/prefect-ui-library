import { JsonInput } from '@/components'
import { InvalidSchemaValueError } from '@/models'
import { schemaPropertyServiceFactory } from '@/services/schemas/properties'
import { SchemaPropertyService } from '@/services/schemas/properties/SchemaPropertyService'
import { SchemaPropertyComponentWithProps } from '@/services/schemas/utilities'
import { SchemaValue, isSchemaValues, SchemaValues } from '@/types/schemas'
import { isEmptyObject, isNullish, mapValues } from '@/utilities'
import { parseUnknownJson, stringifyUnknownJson } from '@/utilities/json'

export class SchemaPropertyObject extends SchemaPropertyService {

  protected override get component(): SchemaPropertyComponentWithProps {
    if (this.has('properties')) {
      return null
    }

    return this.withProps(JsonInput)
  }

  protected get default(): unknown {
    if (this.componentIs(JsonInput)) {
      return stringifyUnknownJson(this.property.default) ?? ''
    }

    return this.property.default ?? {}
  }

  protected request(value: SchemaValue): unknown {
    if (this.componentIs(JsonInput)) {
      return parseUnknownJson(value)
    }

    if (!isSchemaValues(value)) {
      return undefined
    }

    const mapped = mapValues(this.property.properties ?? {}, (key, property) => {
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
    if (isNullish(value)) {
      throw new InvalidSchemaValueError()
    }

    if (this.componentIs(JsonInput)) {
      return stringifyUnknownJson(value)
    }

    // just in case what we got from the api was a json string
    // apparently this isn't uncommon
    const parsed = (parseUnknownJson(value) ?? {}) as SchemaValues

    return mapValues(this.property.properties ?? {}, (key, property) => {
      const propertyValue = parsed[key]
      const service = schemaPropertyServiceFactory(property!, this.level + 1)

      return service.mapResponseValue(propertyValue)
    })
  }
}