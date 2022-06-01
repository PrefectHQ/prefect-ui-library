/* eslint-disable no-redeclare */
import { isDateAfter, isDateAfterOrEqual, isDateBefore, isDateBeforeOrEqual } from '@prefecthq/prefect-design'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ValidationValue = any
type ValidateMethod = (value: ValidationValue) => boolean

function isDate(value: ValidationValue): value is Date {
  return typeof value.getTime === 'function'
}

export function withMessage(validate: (value: ValidationValue) => boolean | Promise<boolean>, message: string) {
  return async (value: ValidationValue) => await validate(value) ? true : message
}

export function isRequired(value: ValidationValue): boolean {
  if (!value) {
    return false
  }

  if (typeof value === 'string' && value.trim().length === 0) {
    return false
  }

  if (Array.isArray(value) && value.length === 0) {
    return false
  }

  if (isDate(value) && isNaN(value.getTime())) {
    return false
  }

  return true
}

export function isEmail(value: ValidationValue): boolean {
  if (!isRequired(value)) {
    return false
  }

  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)
}

export function lessThan(max: ValidationValue): ValidateMethod {
  return (value) => {
    if (!isRequired(value)) {
      return false
    }

    if (typeof value === 'string' && typeof max === 'number') {
      return value.length < max
    }

    if (typeof value === 'number' && typeof max === 'number') {
      return value < max
    }

    if (isDate(value) && isDate(max)) {
      return isDateBefore(value, max)
    }

    return true
  }
}

export function lessThanOrEqual(max: ValidationValue): ValidateMethod {
  return (value) => {
    if (!isRequired(value)) {
      return false
    }

    if (typeof value === 'string' && typeof max === 'number') {
      return value.length <= max
    }

    if (typeof value === 'number' && typeof max === 'number') {
      return value <= max
    }

    if (isDate(value) && isDate(max)) {
      return isDateBeforeOrEqual(value, max)
    }

    return true
  }
}

export function greaterThan(min: ValidationValue): ValidateMethod {
  return (value) => {
    if (!isRequired(value)) {
      return false
    }

    if (typeof value === 'string' && typeof min === 'number') {
      return value.length > min
    }

    if (typeof value === 'number' && typeof min === 'number') {
      return value > min
    }

    if (isDate(value) && isDate(min)) {
      return isDateAfter(value, min)
    }

    return true
  }
}

export function greaterThanOrEqual(min: ValidationValue): ValidateMethod {
  return (value) => {
    if (!isRequired(value)) {
      return false
    }

    if (typeof value === 'string' && typeof min === 'number') {
      return value.length >= min
    }

    if (typeof value === 'number' && typeof min === 'number') {
      return value >= min
    }

    if (isDate(value) && isDate(min)) {
      return isDateAfterOrEqual(value, min)
    }

    return true
  }
}