import { SchemaPropertyService } from './SchemaPropertyService'
import { isValidJsonString, ValidationRule, withMessage } from '@/services/validate'
import { SchemaValue } from '@/types/schemas'

export class SchemaPropertyUnknown extends SchemaPropertyService {


  // todo: I think sometime this should have a component. But it messes up allOf and anyOf
  public readonly component = null
  public readonly default = null

  protected get validators(): ValidationRule[] {
    return [withMessage(isValidJsonString, `${this.property.title} must be valid JSON`)]
  }

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

}