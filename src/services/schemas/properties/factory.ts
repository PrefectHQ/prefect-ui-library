import { SchemaPropertyArray } from './SchemaPropertyArray'
import { SchemaPropertyBlock } from './SchemaPropertyBlock'
import { SchemaPropertyBoolean } from './SchemaPropertyBoolean'
import { SchemaPropertyNone } from './SchemaPropertyNull'
import { SchemaPropertyNumber } from './SchemaPropertyNumber'
import { SchemaPropertyObject } from './SchemaPropertyObject'
import { SchemaPropertyService, SchemaPropertyServiceConstructor } from './SchemaPropertyService'
import { SchemaPropertyString } from './SchemaPropertyString'
import { SchemaPropertyUnknown } from './SchemaPropertyUnknown'
import { SchemaPropertyMissingTypeError } from '@/models/SchemaPropertyMissingTypeError'
import { SchemaProperty, schemaHas } from '@/types/schemas'

export function schemaPropertyServiceFactory(property: SchemaProperty, level: number): SchemaPropertyService {
  const constructor = getSchemaPropertyServiceConstructor(property)
  const service = new constructor({
    property,
    level,
  })

  return service
}

function getSchemaPropertyServiceConstructor(property: SchemaProperty): SchemaPropertyServiceConstructor {
  if (!schemaHas(property, 'type')) {
    if (schemaHas(property, 'enum')) {
      return SchemaPropertyArray
    }

    throw new SchemaPropertyMissingTypeError()
  }

  switch (property.type) {
    case 'string':
      return SchemaPropertyString
    case 'integer':
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
      return SchemaPropertyUnknown
  }
}