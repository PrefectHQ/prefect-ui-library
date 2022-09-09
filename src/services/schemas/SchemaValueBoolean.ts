import { SchemaPropertyService } from './SchemaPropertyService'
import { SchemaValue } from '@/types/schemas'

export class SchemaValueBoolean extends SchemaPropertyService {
  protected override request(value: SchemaValue): unknown {
    return value
  }

  protected override response(value: SchemaValue): unknown {
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

  protected readonly default = null

}