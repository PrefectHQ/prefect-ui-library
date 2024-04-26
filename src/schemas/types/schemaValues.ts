import { isDefined } from '@prefecthq/prefect-design'
import { MaybeRefOrGetter, toValue } from 'vue'
import { isRecord, isString } from '@/utilities'
import { createTuple } from '@/utilities/tuples'

export type SchemaValue = unknown
export type SchemaValues = Record<string, SchemaValue>

export const { values: prefectKinds, isValue: isPrefectKind } = createTuple([
  'none',
  'json',
  'jinja',
  'workspace_variable',
])

export type PrefectKind = typeof prefectKinds[number]

export function getPrefectKindFromValue(source: MaybeRefOrGetter<SchemaValue>): PrefectKind {
  const value = toValue(source)

  if (isPrefectKindValue(value)) {
    return value.__prefect_kind
  }

  return 'none'
}

type BasePrefectKindValue<
  TKind extends PrefectKind = PrefectKind,
  TRest extends Record<string, unknown> = Record<string, unknown>
> = {
  __prefect_kind: TKind,
} & TRest

export type PrefectKindValue = PrefectKindNull | PrefectKindJinja | PrefectKindJson | PrefectKindWorkspaceVariable

export function isPrefectKindValue<T extends PrefectKind = PrefectKind>(value: unknown, kind?: T): value is PrefectKindValue & { __prefect_kind: T } {
  const isKindObject = isRecord(value) && isPrefectKind(value.__prefect_kind)

  if (!isKindObject) {
    return false
  }

  if (isPrefectKind(kind)) {
    return value.__prefect_kind === kind
  }

  return true
}

export type PrefectKindNull = BasePrefectKindValue<'none', {
  value: unknown,
}>

export function isPrefectKindNull(value: unknown): value is PrefectKindNull {
  return isPrefectKindValue(value, 'none') && 'value' in value
}

export type PrefectKindJson = BasePrefectKindValue<'json', {
  value?: string,
}>

export function isPrefectKindJson(value: unknown): value is PrefectKindJson {
  return isPrefectKindValue(value, 'json') && (isString(value.value) || !isDefined(value.value))
}

export type PrefectKindJinja = BasePrefectKindValue<'jinja', {
  template?: string,
}>

export function isPrefectKindJinja(value: unknown): value is PrefectKindJinja {
  return isPrefectKindValue(value, 'jinja') && isString(value.template)
}

export type PrefectKindWorkspaceVariable = BasePrefectKindValue<'workspace_variable', {
  variable_name?: string,
}>

export function isPrefectKindWorkspaceVariable(value: unknown): value is PrefectKindWorkspaceVariable {
  return isPrefectKindValue(value, 'workspace_variable') && (isString(value.variable_name) || !isDefined(value.variable_name))
}

export type BlockDocumentReferenceValue = {
  $ref: string,
}

export function isBlockDocumentReferenceValue(value: unknown): value is BlockDocumentReferenceValue {
  return isRecord(value) && isString(value.$ref)
}

export function asBlockDocumentReferenceValue(value: unknown): BlockDocumentReferenceValue | undefined {
  if (isBlockDocumentReferenceValue(value)) {
    return value
  }

  return undefined
}