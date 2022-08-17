export class InvalidSchemaValueError extends Error {
  public constructor() {
    super('SchemaValue is invalid')
  }
}