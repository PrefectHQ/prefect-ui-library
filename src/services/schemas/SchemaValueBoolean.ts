import { SchemaValueMapper, SchemaValueRequest, SchemaValueResponse } from './SchemaValue'

export class SchemaValueBoolean extends SchemaValueMapper {
  public override request({ value }: SchemaValueRequest): unknown {
    return value
  }

  public override response({ value }: SchemaValueResponse): unknown {
    if (typeof value === 'string') {
      if (value.toLowerCase() === 'true') {
        return true
      }

      if (value.toLowerCase() === 'false') {
        return false
      }
    }

    if (typeof value !== 'boolean') {
      return this.invalid()
    }

    return value
  }

  public override default(): unknown {
    return null
  }

}