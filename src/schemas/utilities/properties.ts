import { isNotNullish } from '@prefecthq/prefect-design'
import { Schema, SchemaProperty, SchemaPropertyType, isPropertyWith } from '@/schemas/types/schema'
import { BlockDocumentReferenceValue, SchemaValue, isBlockDocumentReferenceValue } from '@/schemas/types/schemaValues'
import { getSchemaDefinition } from '@/schemas/utilities/definitions'
import { Require } from '@/types/utilities'
import { isArray, isEmptyObject, isRecord } from '@/utilities'
import { CreateApi } from '@/utilities/api'

const schemaPropertyTypeLabelMap: Record<SchemaPropertyType, string> = {
  'null': 'None',
  'string': 'str',
  'boolean': 'bool',
  'integer': 'int',
  'number': 'float',
  'array': 'list',
  'object': 'dict',
}

export function getSchemaPropertyTypeLabel(type: SchemaPropertyType | undefined): string {
  if (type) {
    return schemaPropertyTypeLabelMap[type]
  }

  return ''
}

export function getSchemaPropertyLabel(property: SchemaProperty): string {
  const type = getSchemaPropertyTypeLabel(property.type)

  return property.title ?? property.format ?? type
}

export function getSchemaPropertyAllOfDefinitions(property: Require<SchemaProperty, 'anyOf'>, schema: Schema): SchemaProperty[] {
  return property.anyOf.map(definition => {
    if (isPropertyWith(definition, '$ref')) {
      return getSchemaDefinition(schema, definition.$ref)
    }

    return definition
  })
}

type InitialIndexContext = {
  property: Require<SchemaProperty, 'anyOf'>,
  value: SchemaValue,
  schema: Schema,
  api: CreateApi,
}

export async function getInitialIndexForSchemaPropertyAnyOfValue({ value, property, schema, api }: InitialIndexContext): Promise<number> {
  // if there's no value default to showing the first definition
  if (!isNotNullish(value)) {
    return 0
  }

  const definitions = getSchemaPropertyAllOfDefinitions(property, schema)

  // block documents are the only reason this utility is async.
  // if the value is a block document reference we need to fetch the block document from the api
  // to determine the block type
  if (isBlockDocumentReferenceValue(value)) {
    return await getBlockDocumentReferenceDefinitionIndex(value, definitions, api)
  }

  switch (typeof value) {
    case 'string':
      return definitions.findIndex(definition => definition.type == 'string')
    case 'number':
      return definitions.findIndex(definition => definition.type == 'number' || definition.type === 'integer')
    case 'boolean':
      return definitions.findIndex(definition => definition.type == 'boolean')
    case 'object':
      return getObjectDefinitionIndex(value, definitions)
    default:
      return -1
  }
}

async function getBlockDocumentReferenceDefinitionIndex(value: BlockDocumentReferenceValue, definitions: SchemaProperty[], api: CreateApi): Promise<number> {
  const blockDocument = await api.blockDocuments.getBlockDocument(value.$ref)

  const definition = definitions.find(definition => definition.block_type_slug === blockDocument.blockType.slug)

  if (definition) {
    return definitions.indexOf(definition)
  }

  return -1
}

function getObjectDefinitionIndex(value: object | null, definitions: SchemaProperty[]): number {
  if (isRecord(value)) {
    return getRecordDefinitionIndex(value, definitions)
  }

  if (isArray(value)) {
    return definitions.findIndex(definition => definition.type === 'array')
  }

  if (value === null) {
    return definitions.findIndex(definition => definition.type === 'null')
  }

  return -1
}

function getRecordDefinitionIndex(value: Record<string, unknown>, definitions: SchemaProperty[]): number {
  if (isEmptyObject(value)) {
    return definitions.findIndex(definition => definition.type === 'object')
  }

  const valueKeys = Object.keys(value)

  const [index, keysInCommon] = definitions.reduce<[number, number]>(([resultIndex, resultKeysInCommon], definition, definitionIndex) => {
    const definitionKeys = Object.keys(definition.properties ?? {})
    const definitionKeysInCommon = valueKeys.filter(value => definitionKeys.includes(value)).length

    if (definitionKeysInCommon > resultKeysInCommon) {
      return [definitionIndex, definitionKeysInCommon]
    }

    return [resultIndex, resultKeysInCommon]
  }, [0, 0])

  if (keysInCommon === 0) {
    return -1
  }

  return index
}