import { SchemaPropertyAny } from '@/services/schemas/properties/SchemaPropertyAny'
import { SchemaPropertyArray } from '@/services/schemas/properties/SchemaPropertyArray'
import { SchemaPropertyBlock } from '@/services/schemas/properties/SchemaPropertyBlock'
import { SchemaPropertyBoolean } from '@/services/schemas/properties/SchemaPropertyBoolean'
import { SchemaPropertyInteger } from '@/services/schemas/properties/SchemaPropertyInteger'
import { SchemaPropertyNone } from '@/services/schemas/properties/SchemaPropertyNull'
import { SchemaPropertyNumber } from '@/services/schemas/properties/SchemaPropertyNumber'
import { SchemaPropertyObject } from '@/services/schemas/properties/SchemaPropertyObject'
import { SchemaPropertyService, SchemaPropertyServiceConstructor } from '@/services/schemas/properties/SchemaPropertyService'
import { SchemaPropertyString } from '@/services/schemas/properties/SchemaPropertyString'
import { SchemaProperty } from '@/types/schemas'

export function schemaPropertyServiceFactory(property: SchemaProperty, level: number): SchemaPropertyService {
  const constructor = getSchemaPropertyServiceConstructor(property)
  const service = new constructor({
    property,
    level,
  })

  return service
}

function getSchemaPropertyServiceConstructor(property: SchemaProperty): SchemaPropertyServiceConstructor {
  switch (property.type) {
    case 'string':
      return SchemaPropertyString
    case 'integer':
      return SchemaPropertyInteger
    case 'number':
      return SchemaPropertyNumber
    case 'boolean':
      return SchemaPropertyBoolean
    case 'null':
      return SchemaPropertyNone
    case 'array':
      return SchemaPropertyArray
    case 'object':
      return SchemaPropertyObject
    case 'block':
      return SchemaPropertyBlock
    case undefined:
      return SchemaPropertyAny
    default:
      throw new Error(`getSchemaPropertyServiceConstructor missing case for ${property.type}`)
  }
}