import { PNumberInput } from '@prefecthq/prefect-design'
import { SchemaPropertyComponentWithProps } from '../utilities'
import { SchemaPropertyService } from './SchemaPropertyService'
import { SchemaValue } from '@/types/schemas'

export class SchemaPropertyInteger extends SchemaPropertyService {

  protected readonly default = null

  protected override get component(): SchemaPropertyComponentWithProps {
    return this.withProps(PNumberInput)
  }

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

}