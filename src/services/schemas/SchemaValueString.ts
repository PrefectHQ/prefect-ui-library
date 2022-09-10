import { isValid } from 'date-fns'
import { mapper } from '../Mapper'
import { SchemaPropertyService } from './SchemaPropertyService'
import { InvalidSchemaValueError } from '@/models'
import { SchemaValue } from '@/types/schemas'
import { isDate } from '@/utilities/dates'

export class SchemaValueString extends SchemaPropertyService {
  protected override request(value: SchemaValue): unknown {
    switch (this.property.format) {
      case 'date':
      case 'date-time':
        return this.formatDateValue(value)
      default:
        return value
    }
  }

  protected override response(value: SchemaValue): unknown {
    if (typeof value !== 'string') {
      throw new InvalidSchemaValueError()
    }

    switch (this.property.format) {
      case 'date':
      case 'date-time':
        return this.parseDateValue(value)
      default:
        return value
    }
  }

  public override get default(): SchemaValue {
    // default value for a PSelect
    if (this.property.enum) {
      return null
    }

    switch (this.property.format) {
      case 'date':
      case 'date-time':
        return null
      default:
        return ''
    }
  }

  private formatDateValue(value: SchemaValue): SchemaValue {
    if (isDate(value)) {
      return mapper.map('Date', value, 'string')
    }

    return value
  }

  private parseDateValue(value: SchemaValue): Date {
    const date = mapper.map('string', value as string, 'Date')

    if (!isValid(date)) {
      this.invalid()
    }

    return date
  }
}