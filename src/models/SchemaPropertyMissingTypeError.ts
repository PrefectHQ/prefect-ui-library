export class SchemaPropertyMissingTypeError extends Error {
  public constructor() {
    super('Schema property has no type and we could not infer its type based on its other properties')
  }
}