export function sameValue(valueA: unknown, valueB: unknown): boolean {
  return JSON.stringify(valueA) === JSON.stringify(valueB)
}

export function isNullish(value: unknown): value is null | undefined {
  return value === null || value === undefined
}

export function isNotNullish<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined
}

export function isDefined<T>(input: T | undefined): input is T {
  return input !== undefined
}