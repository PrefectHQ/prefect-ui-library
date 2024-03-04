import { isDefined } from '@prefecthq/prefect-design'
import { stringify } from '@/utilities/json'
import { isString } from '@/utilities/strings'

export function asType<T extends() => unknown>(value: unknown, type: T): ReturnType<T> | undefined {
  if (typeof value === typeof type()) {
    return value as ReturnType<T>
  }

  return undefined
}

export function asJson(value: unknown): string | undefined {
  if (!isDefined(value)) {
    return undefined
  }

  try {
    // is it already json?
    if (isString(value)) {
      JSON.parse(value)

      return value
    }
  } catch (error) {
    // silence is golden
  }

  return stringify(value)
}