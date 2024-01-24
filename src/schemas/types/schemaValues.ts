import { isRecord, isString } from '@/utilities'
import { createTuple } from '@/utilities/tuples'

export type SchemaValues = Record<string, unknown>

export const { values: prefectKinds, isValue: isPrefectKind } = createTuple([
  null,
  'json',
  'jinja',
  'workspace_variable',
])

export type PrefectKind = typeof prefectKinds[number]

export type PrefectKindValue<
  TKind extends PrefectKind,
  TRest extends Record<string, unknown> = Record<string, unknown>
> = {
  __prefect_kind: TKind,
} & TRest

export function isPrefectKindValue<T extends PrefectKind = PrefectKind>(value: unknown, kind?: T): value is PrefectKindValue<T> {
  const isKindObject = isRecord(value) && isPrefectKind(value.__prefect_kind)

  if (!isKindObject) {
    return false
  }

  if (isPrefectKind(kind)) {
    return value.__prefect_kind === kind
  }

  return true
}

export type PrefectKindNull = PrefectKindValue<null, {
  value: unknown,
}>

export function isPrefectKindNull(value: unknown): value is PrefectKindNull {
  return isPrefectKindValue(value, null) && 'value' in value
}

export type PrefectKindJson = PrefectKindValue<'json', {
  value: string,
}>

export function isPrefectKindJson(value: unknown): value is PrefectKindJson {
  return isPrefectKindValue(value, 'json') && isString(value.value)
}

export type PrefectKindJinja = PrefectKindValue<'jinja', {
  template: string,
}>

export function isPrefectKindJinja(value: unknown): value is PrefectKindJinja {
  return isPrefectKindValue(value, 'jinja') && isString(value.template)
}

export type PrefectKindWorkspaceVariable = PrefectKindValue<'workspace_variable', {
  variable_name: string,
}>

export function isPrefectKindWorkspaceVariable(value: unknown): value is PrefectKindWorkspaceVariable {
  return isPrefectKindValue(value, 'workspace_variable') && isString(value.variable_name)
}