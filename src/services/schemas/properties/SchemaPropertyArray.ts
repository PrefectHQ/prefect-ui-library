import { PCombobox } from '@prefecthq/prefect-design'
import { JsonInput } from '@/components'
import { SchemaPropertyService } from '@/services/schemas/properties/SchemaPropertyService'
import { SchemaPropertyComponentWithProps } from '@/services/schemas/utilities'
import { SchemaValue } from '@/types/schemas'
import { isNullish } from '@/utilities'
import { parseUnknownJson } from '@/utilities/parseUnknownJson'
import { stringifyUnknownJson } from '@/utilities/stringifyUnknownJson'
import { isEmptyString } from '@/utilities/strings'

export class SchemaPropertyArray extends SchemaPropertyService {

  protected get component(): SchemaPropertyComponentWithProps {
    const options = this.getSelectOptions()

    if (options.length) {
      return this.withProps(PCombobox, { options })
    }

    return this.withProps(JsonInput)
  }

  protected get default(): unknown {
    if (this.componentIs(JsonInput)) {
      return stringifyUnknownJson(this.property.default) ?? null
    }

    return this.property.default ?? []
  }

  protected request(value: SchemaValue): unknown {
    if (this.componentIs(JsonInput)) {
      if (isEmptyString(value)) {
        return undefined
      }

      return parseUnknownJson(value)
    }

    return value
  }

  protected response(value: SchemaValue): unknown {
    if (isNullish(value)) {
      return this.invalid()
    }

    if (this.componentIs(JsonInput)) {
      if (typeof value === 'string') {
        return value
      }

      return stringifyUnknownJson(value)
    }

    if (!Array.isArray(value)) {
      return this.invalid()
    }

    return value
  }
}