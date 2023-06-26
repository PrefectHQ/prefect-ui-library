import { isEqual } from 'lodash'
import { WatchEffect, WatchSource, isReactive, isRef, unref, watch } from 'vue'
import { isArray, isFunction, isRecord, mapValues } from '@/utilities'

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

export function getValidWatchSource(source: unknown): WatchSource | WatchSource[] | WatchEffect | object {
  if (isValidWatchValue(source)) {
    return source
  }

  if (isArray(source)) {
    return source.filter(value => isValidWatchValue(value))
  }

  return []
}

function isValidWatchValue(value: unknown): value is WatchSource | WatchEffect {
  return isRef(value) || isReactive(value) || isFunction(value)
}