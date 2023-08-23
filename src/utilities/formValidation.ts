import { ValidationRule } from '@prefecthq/vue-compositions'
import { isEmptyArray, isEmptyString, isInvalidDate, isNullish } from '@/utilities'

export const isRequired: ValidationRule<unknown> = (value, name) => {
  if (isNullish(value) || isEmptyArray(value) || isEmptyString(value) || isInvalidDate(value)) {
    return `${name} is required`
  }

  return true
}

export const isGreaterThanZeroOrNull: ValidationRule<number | undefined> = (value, name) => {
  if (value == null || value > 0) {
    return true
  }

  return `${name} must be greater than 0`
}