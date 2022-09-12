import { PCombobox, PSelect } from '@prefecthq/prefect-design'
import { SchemaPropertyComponentWithProps } from '../utilities'
import { SchemaPropertyService } from './SchemaPropertyService'
import { JsonInput } from '@/components'
import { SchemaType, SchemaValue } from '@/types/schemas'
import { isStringArray, isNumberArray } from '@/utilities'
import { stringifyUnknownJson } from '@/utilities/json'

export class SchemaPropertyArray extends SchemaPropertyService {
  protected request(value: SchemaValue): unknown {
    return value
  }

  protected response(value: SchemaValue): unknown {
    if (!Array.isArray(value)) {
      return this.invalid()
    }

    if (this.usesJsonInput) {
      return stringifyUnknownJson(value)
    }

    return value
  }

  public get default(): unknown {
    if (this.usesJsonInput) {
      return ''
    }

    return []
  }

  public get component(): SchemaPropertyComponentWithProps {
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

  private get usesJsonInput(): boolean {
    const itemsType = this.property.items?.type
    const typesThatUseJson: (SchemaType | undefined)[] = ['array', 'object']

    return typesThatUseJson.includes(itemsType)
  }
}