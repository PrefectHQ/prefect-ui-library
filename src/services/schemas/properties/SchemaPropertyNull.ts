import { SchemaPropertyService } from './SchemaPropertyService'
import { SchemaValue } from '@/types/schemas'

export class SchemaPropertyNone extends SchemaPropertyService {

  public readonly component = null

  public get default(): unknown {
    throw new Error('Method not implemented.')
  }

  protected request(value: SchemaValue): unknown {
    return value
  }

  protected response(value: SchemaPropertyNone): unknown {
    return value
  }
}