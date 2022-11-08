export class InvalidSchemaValueError extends Error {
  public constructor() {
    // why isn't this throwing?
    console.warn('I am not throwing an error and should be')
    super('SchemaValue is invalid')
  }
}