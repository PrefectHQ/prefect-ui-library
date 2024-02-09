import { isRecord } from '@/utilities/object'

export type SchemaValueError = string | SchemaValuePropertyError | SchemaValueIndexError

export type SchemaValuePropertyError = {
  property: string,
  errors: SchemaValueError[],
}

export function isSchemaValuePropertyError(value: SchemaValueError): value is SchemaValuePropertyError {
  return isRecord(value) && 'property' in value
}

export type SchemaValueIndexError = {
  index: number,
  errors: SchemaValueError[],
}

export function isSchemaValueIndexError(value: SchemaValueError): value is SchemaValueIndexError {
  return isRecord(value) && 'index' in value
}

export type SchemaValuesValidationResponse = {
  errors: SchemaValueError[],
  valid: boolean,
}

export function isNotStringError(value: SchemaValueError): value is SchemaValuePropertyError | SchemaValueIndexError {
  return isSchemaValueIndexError(value) || isSchemaValuePropertyError(value)
}