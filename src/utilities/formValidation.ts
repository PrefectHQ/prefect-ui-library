import { ValidationRule } from '@prefecthq/vue-compositions'
import { isEmptyArray, isEmptyString, isInvalidDate, isNullish, isNotNullish } from '@/utilities'

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

export const isGreaterThanOrEqualTo: (number: number) => ValidationRule<number> = number => (value, name) => {
  if (isNotNullish(value) || value >= number) {
    console.log('isGreaterThanOrEqualTo', value, number)
    return true
  }

  return `${name} must be at least ${number}`
}