import { SchemaPropertyService } from './SchemaPropertyService'
import { SchemaType, SchemaValue } from '@/types/schemas'
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

  private get usesJsonInput(): boolean {
    const itemsType = this.property.items?.type
    const typesThatUseJson: (SchemaType | undefined)[] = ['array', 'object']

    return typesThatUseJson.includes(itemsType)
  }
}