/* eslint-disable @typescript-eslint/indent */
import isDate from 'date-fns/isDate'
import { unique } from '@/utilities/arrays'

export function flip<K extends string, V extends string>(obj: Record<K, V>): Record<V, K> {
  const result = {} as Record<V, K>

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      result[obj[key]] = key
    }
  }

  return result
}

export function omit<T extends Record<string, unknown>, K extends(keyof T)[]>(source: T, keys: K): Omit<T, K[number]> {
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

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const copy = new source()

  for (const key in source) {
    copy[key] = clone(source[key])
  }

  return copy
}

export function hasProperty<T extends Record<string | symbol, unknown>>(needle: T, property: unknown): property is keyof T {
  return (typeof property === 'string' || typeof property === 'symbol') && property in needle
}

export type MapKeysCallback<PreviousKey extends PropertyKey, Value, NewKey extends PropertyKey> = (key: PreviousKey, value: Value) => NewKey

export function mapKeys<K extends PropertyKey, V, Key extends PropertyKey>(object: Record<K, V>, callback: MapKeysCallback<K, V, Key>): Record<Key, V> {
  const entries = Object.entries(object) as [K, V][]
  const result = {} as Record<Key, V>

  return entries.reduce((result, [key, value]) => {
    const newKey = callback(key, value)

    result[newKey] = object[key]

    return result
  }, result)
}

export type MapValuesCallback<Key extends PropertyKey, PreviousValue, NewValue> = (key: Key, value: PreviousValue) => NewValue

export function mapValues<Key extends PropertyKey, PreviousValue, NewValue>(object: Record<Key, PreviousValue>, callback: MapValuesCallback<Key, PreviousValue, NewValue>): Record<Key, NewValue> {
  const entries = Object.entries(object) as [Key, PreviousValue][]
  const result = {} as Record<Key, NewValue>

  return entries.reduce((result, [key, value]) => {
    result[key] = callback(key, value)

    return result
  }, result)
}

export type MapEntriesCallback<PreviousKey extends PropertyKey, PreviousValue, NewKey extends PropertyKey, NewValue> = (key: PreviousKey, value: PreviousValue) => [NewKey, NewValue]

export function mapEntries<PreviousKey extends PropertyKey, PreviousValue, NewKey extends PropertyKey, NewValue>(object: Partial<Record<PreviousKey, PreviousValue>>, callback: MapEntriesCallback<PreviousKey, PreviousValue, NewKey, NewValue>): Partial<Record<NewKey, NewValue>> {
  const entries = Object.entries(object) as [PreviousKey, PreviousValue][]
  const result = {} as Record<NewKey, NewValue>

  return entries.reduce((result, [key, value]) => {
    const [newKey, newValue] = callback(key, value)

    result[newKey] = newValue

    return result
  }, result)
}

export function isEmptyObject(value: unknown): value is Record<string, never> {
  return typeof value === 'object' && !Array.isArray(value) && value !== null && Object.keys(value).length === 0
}

export function isTypeRequired<T extends Record<PropertyKey, unknown>>(value: Partial<T>): value is Required<T> {
  return Object.values(value).every(value => value !== undefined)
}

export function hasString<T extends Record<PropertyKey, unknown>>(obj: T, str: string): boolean {
  const values = Object.values(obj).map(val => val?.toString().toLowerCase() ?? '').join('')

  return values.includes(str.toLowerCase())
}

export function isRecord(item: unknown): item is Record<PropertyKey, unknown> {
  return item !== null && typeof item === 'object' && !Array.isArray(item) && !isDate(item)
}

/**
 * @deprecated Please use lodash.merge instead.
 */
export function merge<T extends Record<PropertyKey, unknown>>(target: T, ...sources: T[]): T {
  if (sources.length === 0) {
    return target
  }

  const [source, ...rest] = sources

  const keys = unique([...Object.keys(target), ...Object.keys(source)])

  for (const key of keys) {
    const targetValue: unknown = target[key]
    const sourceValue: unknown = source[key]

    if (targetValue === sourceValue) {
      continue
    }

    if (isRecord(targetValue) && isRecord(sourceValue)) {
      merge(targetValue, sourceValue)
      continue
    }

    if (isRecord(targetValue) && isRecord(source) && !(key in source)) {
      merge(targetValue, { [key]: {} })
      continue
    }

    // this is really sloppy typescript...
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    target[key as keyof T] = source[key] as any
  }

  return merge(target, ...rest)
}

type EmptyObjectsRemoved<T extends Record<PropertyKey, unknown>> = {
  [P in keyof T]: T[P] extends Record<PropertyKey, unknown> ? EmptyObjectsRemoved<T[P]> | undefined : T[P];
}

export function removeEmptyObjects<T extends Record<PropertyKey, unknown>>(input: T): EmptyObjectsRemoved<T> {
  const response: Record<PropertyKey, unknown> = {}
  const keys = Object.keys(input)

  for (const key of keys) {
    const value = input[key]

    if (value === undefined) {
      continue
    }

    if (isRecord(value)) {
      const possiblyEmptyObject = removeEmptyObjects(value)

      if (Object.keys(possiblyEmptyObject).length) {
        response[key] = possiblyEmptyObject
      }

      continue
    }

    response[key] = value
  }

  return response as EmptyObjectsRemoved<T>
}