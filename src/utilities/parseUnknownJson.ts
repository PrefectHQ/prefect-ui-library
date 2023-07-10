import { isString } from '@/utilities/strings'

export function parseUnknownJson(value: unknown): unknown {
  // If the incoming value is a string, we attempt to parse it as JSON.
  if (isString(value)) {
    try {
      const parsed = JSON.parse(value)

      // If the parsed value isn't a string, we return it.
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