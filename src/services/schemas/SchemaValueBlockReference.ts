import { SchemaPropertyService } from './SchemaPropertyService'
import { SchemaValue } from '@/types/schemas'

export class SchemaValueBlockReference extends SchemaPropertyService {
  protected request(value: SchemaValue): unknown {
    throw new Error('Method not implemented.')
  }

  protected response(value: SchemaValue): unknown {
    throw new Error('Method not implemented.')
  }

  protected get default(): unknown {
    throw new Error('Method not implemented.')
  }

}