export function sameValue(valueA: unknown, valueB: unknown): boolean {
  return JSON.stringify(valueA) === JSON.stringify(valueB)
}

export function isNullish(value: unknown): value is null | undefined {
  return value === null || value === undefined
}