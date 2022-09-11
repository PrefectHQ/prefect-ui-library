import { PNumberInput } from '@prefecthq/prefect-design'
import { PropertyComponentWithProps, SchemaPropertyService } from './SchemaPropertyService'
import { SchemaValue } from '@/types/schemas'

export class SchemaPropertyNumber extends SchemaPropertyService {
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

  public readonly default = null

  public override get component(): PropertyComponentWithProps {
    return this.withProps(PNumberInput)
  }

}