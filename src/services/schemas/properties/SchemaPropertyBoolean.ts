import { PToggle } from '@prefecthq/prefect-design'
import { SchemaPropertyService } from '@/services/schemas/properties/SchemaPropertyService'
import { SchemaPropertyComponentWithProps } from '@/services/schemas/utilities'
import { SchemaValue } from '@/types/schemas'
import { isNullish } from '@/utilities'

export class SchemaPropertyBoolean extends SchemaPropertyService {

  protected get default(): unknown {
    return this.property.default ?? null
  }

  public mapRequestValue(value: SchemaValue): SchemaValue | undefined {
    const mappedValue = this.request(value)

    if (isNullish(mappedValue)) {
      return undefined
    }

    return mappedValue
  }

  protected override get component(): SchemaPropertyComponentWithProps {
    return this.withProps(PToggle)
  }

  protected override request(value: SchemaValue): unknown {
    return value
  }

  protected override response(value: SchemaValue): unknown {
    if (typeof value === 'string') {
      if (value.toLowerCase() === 'true') {
        return true
      }

      if (value.toLowerCase() === 'false') {
        return false
      }
    }

    if (typeof value !== 'boolean') {
      return this.invalid()
    }

    return value
  }

}