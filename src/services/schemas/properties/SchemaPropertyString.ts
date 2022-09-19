import { PDateInput, PNumberInput, PSelect, PTextInput } from '@prefecthq/prefect-design'
import { format, isValid, parse } from 'date-fns'
import { SchemaPropertyComponentWithProps } from '../utilities'
import { SchemaPropertyService } from './SchemaPropertyService'
import { JsonInput } from '@/components'
import { InvalidSchemaValueError } from '@/models'
import { isEmail, isValidJsonString, ValidationRule, withMessage } from '@/services/validate'
import { SchemaValue } from '@/types/schemas'
import { isDate } from '@/utilities/dates'

export class SchemaPropertyString extends SchemaPropertyService {
  protected get validators(): ValidationRule[] {
    const { format } = this.property

    if (format === 'email') {
      return [withMessage(isEmail, `${this.property.title} must be a valid email address`)]
    }

    if (format === 'json-string') {
      return [withMessage(isValidJsonString, `${this.property.title} must be valid JSON`)]
    }

    return []
  }

  protected override request(value: SchemaValue): unknown {
    switch (this.property.format) {
      case 'date':
        return this.requestDateValue(value)
      case 'date-time':
        return this.requestDateTimeValue(value)
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
        return this.responseDateValue(value)
      case 'date-time':
        return this.responseDateTimeValue(value)
      default:
        return value
    }
  }

  protected override get default(): SchemaValue {
    // default value for a PSelect
    if (this.property.enum) {
      return null
    }

    switch (this.property.format) {
      case 'date':
      case 'date-time':
      case 'time-delta':
        return null
      default:
        return ''
    }
  }

  protected override get component(): SchemaPropertyComponentWithProps {
    if (this.has('enum')) {
      return this.withProps(PSelect, {
        options: this.getSelectOptions(),
      })
    }

    switch (this.property.format) {
      case 'date':
        return this.withProps(PDateInput)
      case 'date-time':
        return this.withProps(PDateInput, { showTime: true })
      case 'json-string':
        return this.withProps(JsonInput)
      case 'time-delta':
        return this.withProps(PNumberInput)
      default:
        return this.withProps(PTextInput)
    }
  }

  private requestDateValue(value: SchemaValue): SchemaValue {
    if (isDate(value)) {
      return format(value, 'yyyy-MM-dd')
    }

    return value
  }

  private responseDateValue(value: SchemaValue): SchemaValue {
    const date = parse(value as string, 'yyyy-MM-dd', new Date())

    if (!isValid(date)) {
      return this.invalid()
    }

    return date
  }

  private requestDateTimeValue(value: SchemaValue): SchemaValue {
    if (isDate(value)) {
      return format(value, 'yyyy-MM-dd\'T\'HH:mm:ss.000\'Z\'')
    }

    return value
  }

  private responseDateTimeValue(value: SchemaValue): Date {
    const date = parse(value as string, 'yyyy-MM-dd\'T\'HH:mm:ss.SSS\'Z\'', new Date())

    if (!isValid(date)) {
      this.invalid()
    }

    return date
  }
}