type JsonStringify = Parameters<typeof JSON.stringify>
type JsonValue = JsonStringify[0]
type JsonReplacer = JsonStringify[1]

export function stringify(value: JsonValue, replacer?: JsonReplacer): string {
  return JSON.stringify(value, replacer, 2)
}

export function parseUnknownJson(value: unknown): unknown {
  if (typeof value === 'string') {
    try {
      return JSON.parse(value)
    } catch {
      // silence is golden
    }
  }

  return value
}

export function stringifyUnknownJson(value: unknown): string {
  const parsed = parseUnknownJson(value)

  return stringify(parsed)
}