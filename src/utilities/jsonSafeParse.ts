import { isString } from '@/utilities/strings'

export type JsonSafeParse = {
  success: boolean,
  value: unknown,
}

export function jsonSafeParse(value: unknown): JsonSafeParse {
  try {
    if (!isString(value)) {
      throw new Error()
    }

    const parsed = JSON.parse(value)

    return {
      success: true,
      value: parsed,
    }
  } catch {
    // silence is golden
  }

  return {
    success: false,
    value,
  }
}