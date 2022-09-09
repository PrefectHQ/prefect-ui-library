import { SchemaPropertyService } from './SchemaPropertyService'
import { SchemaValue } from '@/types/schemas'

export class SchemaValueNone extends SchemaPropertyService {
  protected request(value: SchemaValue): unknown {
    return value
  }

  protected response(value: SchemaValueNone): unknown {
    return value
  }

  protected get default(): unknown {
    throw new Error('Method not implemented.')
  }
}