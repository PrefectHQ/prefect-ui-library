import { SchemaValueMapper, SchemaValueRequest, SchemaValueResponse } from './SchemaValue'

export class SchemaValueNone extends SchemaValueMapper {
  public request({ value }: SchemaValueRequest): unknown {
    return value
  }

  public response({ value }: SchemaValueResponse): unknown {
    return value
  }

  public default(): unknown {
    throw new Error('Method not implemented.')
  }
}