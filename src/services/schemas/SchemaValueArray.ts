import { SchemaValueMapper, SchemaValueRequest, SchemaValueResponse } from './SchemaValue'
import { SchemaProperty, SchemaType } from '@/types/schemas'
import { stringifyUnknownJson } from '@/utilities/json'

export class SchemaValueArray extends SchemaValueMapper {
  public request({ value }: SchemaValueRequest): unknown {
    return value
  }

  public response({ property, value: values }: SchemaValueResponse): unknown {
    if (!Array.isArray(values)) {
      return this.invalid()
    }

    if (this.usesJsonInput(property)) {
      return stringifyUnknownJson(values)
    }

    return values
  }

  public default(property: SchemaProperty): unknown {
    if (this.usesJsonInput(property)) {
      return ''
    }

    return []
  }

  private usesJsonInput(property: SchemaProperty): boolean {
    const itemsType = property.items?.type
    const typesThatUseJson: (SchemaType | undefined)[] = ['array', 'object']

    return typesThatUseJson.includes(itemsType)
  }
}