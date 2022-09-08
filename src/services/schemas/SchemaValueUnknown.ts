import { SchemaValueMapper, SchemaValueRequest, SchemaValueResponse } from './SchemaValue'
import { isValidJsonString } from '@/services/validate'

export class SchemaValueUnknown extends SchemaValueMapper {
  public request({ value }: SchemaValueRequest): unknown {
    try {
      if (typeof value === 'string') {
        return JSON.parse(value)
      }
    } catch (error) {
      console.error(error)
    }

    return value
  }

  public response({ value }: SchemaValueResponse): unknown {
    if (!isValidJsonString(value)) {
      return JSON.stringify(value)
    }

    return value
  }

  public default(): unknown {
    return null
  }

}