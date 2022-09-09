import { SchemaPropertyService } from './SchemaPropertyService'
import { isValidJsonString } from '@/services/validate'
import { SchemaValue } from '@/types/schemas'

export class SchemaValueUnknown extends SchemaPropertyService {
  protected request(value: SchemaValue): unknown {
    try {
      if (typeof value === 'string') {
        return JSON.parse(value)
      }
    } catch (error) {
      console.error(error)
    }

    return value
  }

  protected response(value: SchemaValue): unknown {
    if (!isValidJsonString(value)) {
      return JSON.stringify(value)
    }

    return value
  }

  protected readonly default = null

}