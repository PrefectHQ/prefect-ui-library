import { isDefined } from '@prefecthq/prefect-design'
import { PrefectKind, PrefectKindJinja, PrefectKindJson, PrefectKindWorkspaceVariable, SchemaValue, getPrefectKindFromValue, isPrefectKindJinja, isPrefectKindJson, isPrefectKindNull, isPrefectKindWorkspaceVariable, isPrefectKindValue } from '@/schemas/types/schemaValues'
import { isRecord, mapValues, parseUnknownJson } from '@/utilities'
import { isValidJson, stringify } from '@/utilities/json'

export class InvalidSchemaValueTransformation extends Error {
  public constructor(from: PrefectKind, to: PrefectKind) {
    super(`Unable to convert prefect kind value from ${from} to ${to}`)
  }
}

export function isInvalidSchemaValueTransformationError(value: unknown): value is InvalidSchemaValueTransformation {
  return value instanceof InvalidSchemaValueTransformation
}

export function mapSchemaValue(value: SchemaValue, to: PrefectKind): SchemaValue {
  const from = getPrefectKindFromValue(value)

  if (isPrefectKindJinja(value)) {
    return mapSchemaValueJinja(value, to)
  }

  // we cannot map a workspace variable to any other kinds
  if (isPrefectKindWorkspaceVariable(value)) {
    throw new InvalidSchemaValueTransformation(from, to)
  }

  if (isPrefectKindJson(value)) {
    return mapSchemaValueJson(value, to)
  }


  if (from === 'none') {
    return mapSchemaValueNone(value, to)
  }

  throw new Error(`Unhandled prefect kind value in mapSchemaValue: ${from}`)
}

function mapSchemaValueJinja(jinja: PrefectKindJinja, to: PrefectKind): SchemaValue {
  switch (to) {
    case 'jinja':
      return jinja

    case 'workspace_variable':
      throw new InvalidSchemaValueTransformation('jinja', 'workspace_variable')

    case 'json':
      return {
        __prefect_kind: 'json',
        value: jinja.template,
      } satisfies PrefectKindJson

    case 'none':
      if (isValidJson(jinja.template)) {
        return JSON.parse(jinja.template)
      }

      throw new InvalidSchemaValueTransformation('jinja', 'none')
    default:
      throw new Error(`mapSchemaValueJson missing case for kind: ${to}`)
  }
}

function mapSchemaValueJson(json: PrefectKindJson, to: PrefectKind): SchemaValue {
  switch (to) {
    case 'jinja':
      return {
        __prefect_kind: 'jinja',
        template: json.value,
      } satisfies PrefectKindJinja

    case 'workspace_variable':
      throw new InvalidSchemaValueTransformation('json', 'workspace_variable')

    case 'json':
      return json

    case 'none':
      if (isDefined(json.value) && isValidJson(json.value)) {
        return JSON.parse(json.value)
      }

      throw new InvalidSchemaValueTransformation('json', 'none')

    default:
      throw new Error(`mapSchemaValueJson missing case for kind: ${to}`)
  }
}

function mapSchemaValueNone(none: unknown, to: PrefectKind): SchemaValue {
  const value = isPrefectKindNull(none) ? none.value : none

  switch (to) {
    case 'jinja':
      return {
        __prefect_kind: 'jinja',
        template: stringify(value),
      } satisfies PrefectKindJinja

    case 'workspace_variable':
      return {
        __prefect_kind: 'workspace_variable',
      } satisfies PrefectKindWorkspaceVariable

    case 'json':
      let normalizedMappedValue: SchemaValue = value

      if (isDefined(value) && isRecord(value)) {
        normalizedMappedValue = mapValues(value, (key, value) => mapSchemaValue(value, 'none'))
      }

      return {
        __prefect_kind: 'json',
        value: stringify(normalizedMappedValue),
      } satisfies PrefectKindJson

    case 'none':
      return none

    default:
      throw new Error(`mapSchemaValueNone missing case for kind: ${to}`)
  }
}