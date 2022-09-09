import { SchemaPropertyService } from './SchemaPropertyService'
import { SchemaValue } from '@/types/schemas'

export class SchemaValueNumber extends SchemaPropertyService {
  protected request(value: SchemaValue): unknown {
    return value
  }

  protected response(value: SchemaValue): unknown {
    const result = parseInt(value as string)

    if (isNaN(result)) {
      return this.invalid()
    }

    return result
  }

  protected readonly default = null

}