export function toPluralString(word: string, count: number): string {
  if (count == 1) {
    return word
  }

  const ending = ['s', 'sh', 'ch', 'x', 'z'].some((chars) => word.endsWith(chars),
  )
    ? 'es'
    : 's'

  return `${word}${ending}`
}

export function snakeCase(string: string): string {
  return string
    .replace(/\W+/g, ' ')
    .split(/ |\B(?=[A-Z])/)
    .map((word) => word.toLowerCase())
    .join('_')
}

export function kebabCase(string: string): string {
  return string
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase()
}

export function isString(value: unknown): value is string {
  return typeof value === 'string'
}

export function capitalize<T extends string>(value: T): Capitalize<T> {
  const firstLetterCapitalized = value.charAt(0).toUpperCase()
  const rest = value.slice(1)

  return `${firstLetterCapitalized}${rest}` as Capitalize<T>
}
