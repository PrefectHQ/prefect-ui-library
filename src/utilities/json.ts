import { isRecord } from '@/utilities'

type JsonStringify = Parameters<typeof JSON.stringify>
type JsonValue = JsonStringify[0]
type JsonReplacer = JsonStringify[1]

export function stringify(value: JsonValue, replacer?: JsonReplacer): string {
  return JSON.stringify(value, replacer, 2)
}

export function isValidJsonRecord(value: unknown): value is string {
  try {
    const parsed = JSON.parse(value as string)
    return isRecord(parsed)
  } catch {
    return false
  }
}