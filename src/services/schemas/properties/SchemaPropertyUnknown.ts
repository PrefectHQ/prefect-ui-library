import { SchemaPropertyService } from './SchemaPropertyService'
import { SchemaValue } from '@/types/schemas'
import { parseUnknownJson } from '@/utilities/json'

export class SchemaPropertyUnknown extends SchemaPropertyService {

  public readonly component = null
  public readonly default = null

  protected request(value: SchemaValue): unknown {
    return parseUnknownJson(value)
  }

  protected response(value: SchemaValue): unknown {
    return value
  }

}