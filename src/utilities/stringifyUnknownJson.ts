import { parseUnknownJson } from '@/utilities/parseUnknownJson'
import { isString } from '@/utilities/strings'

export function stringifyUnknownJson(value: unknown): string | null | undefined {
  const parsed = parseUnknownJson(value)

  if (isString(parsed)) {
    return parsed
  }

  return JSON.stringify(parsed)
}