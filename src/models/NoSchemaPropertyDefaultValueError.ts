export class NoSchemaPropertyDefaultValueError extends Error {
  public constructor() {
    super('Schema property has no default value')
  }
}