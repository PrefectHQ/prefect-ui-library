export type SchemaValuesValidationError = string | SchemaValuesValidationPropertyError | SchemaValuesValidationIndexError

export type SchemaValuesValidationPropertyError = {
  property: string,
  errors: SchemaValuesValidationError[],
}

export type SchemaValuesValidationIndexError = {
  index: number,
  errors: SchemaValuesValidationError[],
}

export type SchemaValuesValidationResponse = {
  errors: SchemaValuesValidationError[],
  valid: boolean,
}