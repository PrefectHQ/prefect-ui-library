import { stringify } from '@/utilities/json'
import { isString } from '@/utilities/strings'
import { isNullish } from '@/utilities/variables'

export function asType<T extends() => unknown>(value: unknown, type: T): ReturnType<T> | undefined {
  if (typeof value === typeof type()) {
    return value as ReturnType<T>
  }

  return undefined
}

export function asJson(value: unknown): string {
  if (isNullish(value)) {
    return ''
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