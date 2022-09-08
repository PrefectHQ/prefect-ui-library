import { SchemaValueMapper, SchemaValueRequest, SchemaValueResponse } from './SchemaValue'

export class SchemaValueNumber extends SchemaValueMapper {
  public request({ value }: SchemaValueRequest): unknown {
    return value
  }

  public response({ value }: SchemaValueResponse): unknown {
    const result = parseInt(value as string)

    if (isNaN(result)) {
      return this.invalid()
    }

    return result
  }

  public default(): unknown {
    return null
  }

}