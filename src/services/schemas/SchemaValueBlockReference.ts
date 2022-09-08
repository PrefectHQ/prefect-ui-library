import { SchemaValueMapper } from './SchemaValue'
import { SchemaProperty } from '@/types/schemas'

export class SchemaValueBlockReference extends SchemaValueMapper {
  public request(request: { property: SchemaProperty, value: unknown, level: number }): unknown {
    throw new Error('Method not implemented.')
  }

  public response(response: { property: SchemaProperty, value: unknown, level: number }): unknown {
    throw new Error('Method not implemented.')
  }

  public default(property: SchemaProperty): unknown {
    throw new Error('Method not implemented.')
  }

}