import { SchemaPropertyAny } from './SchemaPropertyAny'
import { SchemaPropertyArray } from './SchemaPropertyArray'
import { SchemaPropertyBlock } from './SchemaPropertyBlock'
import { SchemaPropertyBoolean } from './SchemaPropertyBoolean'
import { SchemaPropertyInteger } from './SchemaPropertyInteger'
import { SchemaPropertyNone } from './SchemaPropertyNull'
import { SchemaPropertyNumber } from './SchemaPropertyNumber'
import { SchemaPropertyObject } from './SchemaPropertyObject'
import { SchemaPropertyService, SchemaPropertyServiceConstructor } from './SchemaPropertyService'
import { SchemaPropertyString } from './SchemaPropertyString'
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
  }
}