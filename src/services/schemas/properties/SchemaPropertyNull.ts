import { SchemaPropertyService } from '@/services/schemas/properties/SchemaPropertyService'
import { SchemaValue } from '@/types/schemas'

export class SchemaPropertyNone extends SchemaPropertyService {

  public readonly component = null
  public readonly default = undefined

  protected request(value: SchemaValue): unknown {
    return value
  }

  protected response(value: SchemaPropertyNone): unknown {
    return value
  }
}