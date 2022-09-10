import { SchemaPropertyService } from './SchemaPropertyService'
import { SchemaValue } from '@/types/schemas'

export class SchemaPropertyNone extends SchemaPropertyService {
  protected request(value: SchemaValue): unknown {
    return value
  }

  protected response(value: SchemaPropertyNone): unknown {
    return value
  }

  public get default(): unknown {
    throw new Error('Method not implemented.')
  }
}