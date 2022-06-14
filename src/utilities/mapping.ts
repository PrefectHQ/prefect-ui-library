import { camelCase, snakeCase } from './strings'

type SnakeToCamelCase<T> =
  T extends string
    ? T extends `${infer U}_${infer V}`
      ? `${U}${Capitalize<SnakeToCamelCase<V>>}`
      : T
    : T extends object ? {
      [K in keyof T as SnakeToCamelCase<K & string>]: T[K]
    } : T

type CamelToSnakeCase<T> =
    T extends string
      ? T extends `${infer U}${infer V}` ? `${U extends Capitalize<U> ? '_' : ''}${Lowercase<U>}${CamelToSnakeCase<V>}` : T
      : T extends object ? {
        [K in keyof T as CamelToSnakeCase<K & string>]: T[K]
      } : T

export function mapSnakeToCamelCase<T extends Record<string, unknown>>(source: T): SnakeToCamelCase<T> {
  const response: Record<string, unknown> = {}

  for (const key in source) {
    const keyCamelCase = camelCase(key)

    response[keyCamelCase] = source[key]
  }

  return response as SnakeToCamelCase<T>
}

export function mapCamelToSnakeCase<T extends Record<string, unknown>>(source: T): CamelToSnakeCase<T> {
  const response: Record<string, unknown> = {}

  for (const key in source) {
    const keySnakeCase = snakeCase(key)

    response[keySnakeCase] = source[key]
  }

  return response as CamelToSnakeCase<T>
}