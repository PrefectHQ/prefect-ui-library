export function isNumber(value: unknown): value is number {
  return typeof value === 'number'
}

export function toPercent(x: number, y: number): number | undefined {
  const decimal = x / y
  const percent = Math.round((decimal + Number.EPSILON) * 10000) / 100

  if (isNaN(percent)) {
    return undefined
  }

  return percent
}