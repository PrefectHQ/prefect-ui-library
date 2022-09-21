import { PNumberInput, PSelect } from '@prefecthq/prefect-design'
import { SchemaPropertyComponentWithProps } from '../utilities'
import { SchemaPropertyService } from './SchemaPropertyService'
import { SchemaPropertyInputAttrs, SchemaValue } from '@/types/schemas'

export class SchemaPropertyNumber extends SchemaPropertyService {

  protected get default(): unknown {
    return this.property.default ?? null
  }

  protected override get component(): SchemaPropertyComponentWithProps {
    if (this.has('enum')) {
      return this.withProps(PSelect, {
        options: this.getSelectOptions(),
      })
    }

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