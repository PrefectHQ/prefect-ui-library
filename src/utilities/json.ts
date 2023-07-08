import { isRecord, isString } from '@/utilities'

type JsonStringify = Parameters<typeof JSON.stringify>
type JsonValue = JsonStringify[0]
type JsonReplacer = JsonStringify[1]

export function stringify(value: JsonValue, replacer?: JsonReplacer): string {
  return JSON.stringify(value, replacer, 2)
}

export function parseUnknownJson(value: unknown): unknown {
  // If the incoming value is a string, we attempt to parse it as JSON.
  if (isString(value)) {
    try {
      const parsed = JSON.parse(value)

      // If the parsed value is a record, we return it.
      if (!isString(parsed)) {
        return parsed
      }

      // Otherwise, we return the original value, since strings are valid JSON.
      return value
    } catch {
      // silence is golden
    }
  }

  return value
}

export function stringifyUnknownJson(value: unknown): string | null | undefined {
  const parsed = parseUnknownJson(value)

  if (isString(parsed)) {
    return value as string
  }

  return JSON.stringify(parsed)
}

export function isValidJsonRecord(value: unknown): value is string {
  try {
    const parsed = JSON.parse(value as string)
    return isRecord(parsed)
  } catch {
    return false
  }
}