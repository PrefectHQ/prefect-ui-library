import { isDefined } from '@prefecthq/prefect-design'
import { PrefectKind, PrefectKindJinja, PrefectKindJson, PrefectKindWorkspaceVariable, SchemaValue, getPrefectKindFromValue, isPrefectKindJinja, isPrefectKindJson, isPrefectKindNull, isPrefectKindWorkspaceVariable } from '@/schemas/types/schemaValues'
import { isValidJson, stringify } from '@/utilities/json'

export function mapSchemaValue(value: SchemaValue, to: PrefectKind): SchemaValue {
  if (isPrefectKindJinja(value)) {
    return mapSchemaValueJinja(value, to)
  }

  // we cannot map a workspace variable to any other kinds
  if (isPrefectKindWorkspaceVariable(value)) {
    return undefined
  }

  if (isPrefectKindJson(value)) {
    return mapSchemaValueJson(value, to)
  }

  const kind = getPrefectKindFromValue(value)

  if (kind === 'none') {
    return mapSchemaValueNone(value, to)
  }

  throw new Error(`Unhandled prefect kind value in mapSchemaValue: ${kind}`)
}

function mapSchemaValueJinja(jinja: PrefectKindJinja, to: PrefectKind): SchemaValue {
  switch (to) {
    case 'jinja':
      return jinja
    case 'workspace_variable':
      return undefined
    case 'json':
      return jinja.template
    case 'none':
      return isValidJson(jinja.template) ? JSON.parse(jinja.template) : undefined
    default:
      throw new Error(`mapSchemaValueJson missing case for kind: ${to}`)
  }
}

function mapSchemaValueJson(json: PrefectKindJson, to: PrefectKind): SchemaValue {
  switch (to) {
    case 'jinja':
      return json.value
    case 'workspace_variable':
      const variable: PrefectKindWorkspaceVariable = {
        __prefect_kind: 'workspace_variable',
      }

      return variable
    case 'json':
      return json
    case 'none':
      return isDefined(json.value) && isValidJson(json.value) ? JSON.parse(json.value) : undefined
    default:
      throw new Error(`mapSchemaValueJson missing case for kind: ${to}`)
  }
}

function mapSchemaValueNone(none: unknown, to: PrefectKind): SchemaValue {
  const kind = getPrefectKindFromValue(none)

  if (kind !== 'none') {
    throw new Error(`mapSchemaValueNone called with value of kind: ${kind}`)
  }

  const value = isPrefectKindNull(none) ? none.value : none

  switch (to) {
    case 'jinja':
      const jinja: PrefectKindJinja = {
        __prefect_kind: 'jinja',
        template: stringify(value),
      }

      return jinja

    case 'workspace_variable':
      const variable: PrefectKindWorkspaceVariable = {
        __prefect_kind: 'workspace_variable',
      }

      return variable

    case 'json':
      const json: PrefectKindJson = {
        __prefect_kind: 'json',
        value: stringify(value),
      }

      return json
    case 'none':
      return none
    default:
      throw new Error(`mapSchemaValueNone missing case for kind: ${to}`)
  }
}