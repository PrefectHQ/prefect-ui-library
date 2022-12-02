import isDate from 'date-fns/isDate'

export function flip<K extends string, V extends string>(obj: Record<K, V>): Record<V, K> {
  const result = {} as Record<V, K>

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      result[obj[key]] = key
    }
  }

  return result
}

export function omit<T extends Record<string, unknown>, K extends (keyof T)[]>(source: T, keys: K): Omit<T, K[number]> {
  const copy = { ...source }

  keys.forEach(key => delete copy[key])

  return copy
}

export function clone<T>(source: T): T {
  if (source === null || typeof source !== 'object') {
    return source
  }

  if (isDate(source)) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return new Date(source)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const copy = new (source as any).constructor()

  for (const key in source) {
    copy[key] = clone(source[key])
  }

  return copy
}

export function hasProperty<T extends Record<string | symbol, unknown>>(needle: T, property: unknown): property is keyof T {
  return (typeof property === 'string' || typeof property === 'symbol') && property in needle
}

export type MapEntriesCallback<K, V, R> = (key: K, value: V) => R

export function mapEntries<K extends string | number | symbol, V, R>(object: Record<K, V>, callback: MapEntriesCallback<K, V, R>): Record<K, R> {
  const entries = Object.entries(object) as [K, V][]
  const result = {} as Record<K, R>

  return entries.reduce((result, [key, value]) => {
    result[key] = callback(key, value)

    return result
  }, result)
}

export function isEmptyObject(value: unknown): value is Record<string, never> {
  return typeof value === 'object' && !Array.isArray(value) && value !== null && Object.keys(value).length === 0
}

export function isTypeRequired<T extends Record<string | number | symbol, unknown>>(value: Partial<T>): value is Required<T> {
  return Object.values(value).every(value => value !== undefined)
}