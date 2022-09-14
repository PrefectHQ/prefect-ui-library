import { PCombobox, PSelect } from '@prefecthq/prefect-design'
import { SchemaPropertyComponentWithProps } from '../utilities'
import { SchemaPropertyService } from './SchemaPropertyService'
import { JsonInput } from '@/components'
import { SchemaValue } from '@/types/schemas'
import { isStringArray, isNumberArray } from '@/utilities'
import { parseUnknownJson, stringifyUnknownJson } from '@/utilities/json'

export class SchemaPropertyArray extends SchemaPropertyService {

  protected get component(): SchemaPropertyComponentWithProps {
    if (isStringArray(this.property.enum) || isNumberArray(this.property.enum)) {
      return this.withProps(PSelect, {
        options: this.getSelectOptions(),
      })
    }

    const itemType = this.property.items?.type

    if (itemType === 'number' || itemType === 'string') {
      return this.withProps(PCombobox, { options: [], allowUnknownValue: true })
    }

    return this.withProps(JsonInput)
  }

  protected get default(): unknown {
    if (this.componentIs(JsonInput)) {
      return ''
    }

    return []
  }

  protected request(value: SchemaValue): unknown {
    if (this.componentIs(JsonInput)) {
      return parseUnknownJson(value)
    }

    return value
  }

  protected response(value: SchemaValue): unknown {
    if (this.componentIs(JsonInput)) {
      return stringifyUnknownJson(value)
    }

    if (!Array.isArray(value)) {
      return this.invalid()
    }

    return value
  }
}