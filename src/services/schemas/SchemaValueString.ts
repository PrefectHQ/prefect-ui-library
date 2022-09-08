import { isValid } from 'date-fns'
import { SchemaValueMapper, SchemaValueRequest, SchemaValueResponse } from './SchemaValue'
import { SchemaProperty, SchemaValue } from '@/types/schemas'
import { isDate } from '@/utilities/dates'

export class SchemaValueString extends SchemaValueMapper {
  public override request({ property, value }: SchemaValueRequest): unknown {
    switch (property.format) {
      case 'date':
      case 'date-time':
        return this.formatDateValue(value)
      default:
        return value
    }
  }

  public override response({ property, value }: SchemaValueResponse): unknown {
    if (typeof value !== 'string') {
      this.invalid()
    }

    switch (property.format) {
      case 'date':
      case 'date-time':
        return this.parseDateValue(property, value)
      default:
        return value
    }
  }

  public override default({ format }: SchemaProperty): SchemaValue {
    switch (format) {
      case 'date':
      case 'date-time':
        return null
      default:
        return ''
    }
  }

  private formatDateValue(value: SchemaValue): SchemaValue {
    if (isDate(value)) {
      return this.map('Date', value, 'string')
    }

    return value
  }

  private parseDateValue(property: SchemaProperty, value: SchemaValue): Date {
    const date = this.map('string', value as string, 'Date')

    if (!isValid(date)) {
      this.invalid()
    }

    return date
  }
}