import camelCaseLodash from 'lodash.camelcase'

export const vowels: string[] = ['a', 'e', 'i', 'o', 'u', 'y']

export const pluralize = (word: string): string => {
  if (word.endsWith('s')) {
    return word
  }

  if (word.match(/(ss|ish|ch|x|us)$/)) {
    word += 'e'

  } else if (word.endsWith('y') && !vowels.includes(word.charAt(word.length - 2))) {
    word = word.slice(0, word.length - 1)
    word += 'ie'
  }

  return `${word}s`
}

export function toPluralString(word: string, count?: number): string {
  if (count === 1) {
    return word
  }

  return pluralize(word)
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

// todo: this removes symbols like $.
// camelCase('$ref') => 'ref'
export function camelCase(str: string): string {
  return camelCaseLodash(str)
}

export function titleCase(str: string): string {
  return str.replace(/^[-_]*(.)/, (match, char) => char.toUpperCase()).replace(/[-_]+(.)/g, (match, char) => ` ${ char.toUpperCase()}`)
}

export function isString(value: unknown): value is string {
  return typeof value === 'string'
}

export function capitalize<T extends string>(value: T): Capitalize<T> {
  const firstLetterCapitalized = value.charAt(0).toUpperCase()
  const rest = value.slice(1)

  return `${firstLetterCapitalized}${rest}` as Capitalize<T>
}

export function uppercase<T extends string>(value: T): Uppercase<T> {
  return value.toUpperCase() as Uppercase<T>
}

export function isEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length === 0
}

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export function isValidEmailAddress(value: unknown): boolean {
  return typeof value === 'string' && EMAIL_REGEX.test(value)
}

export function removeWhitespace(value: string): string {
  return value.replace(/\s/g, '')
}