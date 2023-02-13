import { isEqual } from 'lodash'
import { isRef, unref, watch } from 'vue'
import { isArray, isRecord, mapValues } from '@/utilities'

function getRawValue(value: unknown): unknown {
  if (typeof value === 'object') {
    if (isRef(value)) {
      return unref(value)
    }

    if (isArray(value)) {
      return getRawArrayValue(value)
    }

    if (isRecord(value)) {
      return getRawRecordValue(value)
    }
  }

  return value
}

function getRawArrayValue(values: unknown[]): unknown[] {
  return values.map(value => getRawValue(value))
}

function getRawRecordValue(value: Record<PropertyKey, unknown>): Record<PropertyKey, unknown> {
  return mapValues(value, (key, value) => getRawValue(value))
}

export function uniqueValueWatcher(...[source, callback, options]: Parameters<typeof watch>): ReturnType<typeof watch> {
  let previous = getRawValue(source)

  return watch(source, (...args) => {
    const current = getRawValue(source)

    if (isEqual(previous, current)) {
      return
    }

    previous = current

    callback(...args)
  }, options)
}