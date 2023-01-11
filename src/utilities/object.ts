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

export type ObjectKey = string | number | symbol

export type MapKeysCallback<PreviousKey extends ObjectKey, Value, NewKey extends ObjectKey> = (key: PreviousKey, value: Value) => NewKey

export function mapKeys<K extends ObjectKey, V, Key extends ObjectKey>(object: Record<K, V>, callback: MapKeysCallback<K, V, Key>): Record<Key, V> {
  const entries = Object.entries(object) as [K, V][]
  const result = {} as Record<Key, V>

  return entries.reduce((result, [key, value]) => {
    const newKey = callback(key, value)

    result[newKey] = object[key]

    return result
  }, result)
}

export type MapValuesCallback<Key extends ObjectKey, PreviousValue, NewValue> = (key: Key, value: PreviousValue) => NewValue

export function mapValues<Key extends ObjectKey, PreviousValue, NewValue>(object: Record<Key, PreviousValue>, callback: MapValuesCallback<Key, PreviousValue, NewValue>): Record<Key, NewValue> {
  const entries = Object.entries(object) as [Key, PreviousValue][]
  const result = {} as Record<Key, NewValue>

  return entries.reduce((result, [key, value]) => {
    result[key] = callback(key, value)

    return result
  }, result)
}

export type MapEntriesCallback<PreviousKey extends ObjectKey, PreviousValue, NewKey extends ObjectKey, NewValue> = (key: PreviousKey, value: PreviousValue) => [NewKey, NewValue]

export function mapEntries<PreviousKey extends ObjectKey, PreviousValue, NewKey extends ObjectKey, NewValue>(object: Partial<Record<PreviousKey, PreviousValue>>, callback: MapEntriesCallback<PreviousKey, PreviousValue, NewKey, NewValue>): Partial<Record<NewKey, NewValue>> {
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

export function isTypeRequired<T extends Record<string | number | symbol, unknown>>(value: Partial<T>): value is Required<T> {
  return Object.values(value).every(value => value !== undefined)
}

export function hasString(obj: Record<string | number | symbol, unknown>, str: string): boolean {
  const values = Object.values(obj).map(val => val?.toString().toLowerCase() ?? '').join('')
  return values.includes(str.toLowerCase())
}