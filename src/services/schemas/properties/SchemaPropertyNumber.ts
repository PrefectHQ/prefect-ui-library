import { PNumberInput } from '@prefecthq/prefect-design'
import { SchemaPropertyComponentWithProps } from '../utilities'
import { SchemaPropertyService } from './SchemaPropertyService'
import { SchemaPropertyInputAttrs, SchemaValue } from '@/types/schemas'

export class SchemaPropertyNumber extends SchemaPropertyService {

  protected readonly default = null

  protected override get component(): SchemaPropertyComponentWithProps {
    return this.withProps(PNumberInput)
  }

  protected get attrs(): SchemaPropertyInputAttrs {
    return {
      step: 'any',
    }
  }

  protected request(value: SchemaValue): unknown {
    return value
  }

  protected response(value: SchemaValue): unknown {
    const result = parseFloat(value as string)

    if (isNaN(result)) {
      return this.invalid()
    }

    return result
  }

}