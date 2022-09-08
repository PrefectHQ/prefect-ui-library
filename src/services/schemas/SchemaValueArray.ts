import { SchemaValueMapper, SchemaValueRequest, SchemaValueResponse } from './SchemaValue'
import { schemaHas } from '@/types/schemas'

export class SchemaValueArray extends SchemaValueMapper {
  public request({ value }: SchemaValueRequest): unknown {
    return value
  }

  public response({ property, value: values }: SchemaValueResponse): unknown {
    if (!Array.isArray(values)) {
      return this.invalid()
    }

    if (schemaHas(property, 'items')) {
      return values.map(value => this.mapResponse(value, property.items))
    }

    return values
  }

  public default(): unknown {
    return []
  }
}