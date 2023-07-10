import { parseISO } from 'date-fns'
import { isString } from '@/utilities/strings'

export type JsonSafeParse = {
  success: boolean,
  value: unknown,
}

type JsonParse = Parameters<typeof JSON.parse>
type JsonReviver = JsonParse[1]

const ISO_DATE_REGEX = /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/

const reviver: JsonReviver = (key, value) => {
  if (ISO_DATE_REGEX.test(value)) {
    return parseISO(value)
  }

  return value
}

export function jsonSafeParse(value: unknown): JsonSafeParse {
  try {
    if (!isString(value)) {
      throw new Error()
    }

    const parsed = JSON.parse(value, reviver)

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