import { PNumberInput, PSelect, PTextInput } from '@prefecthq/prefect-design'
import { format, isValid, parse } from 'date-fns'
import { SchemaPropertyComponentWithProps } from '../utilities'
import { SchemaPropertyService } from './SchemaPropertyService'
import DateInput from '@/components/DateInput.vue'
import JsonInput from '@/components/JsonInput.vue'
import { InvalidSchemaValueError } from '@/models'
import { SchemaValue } from '@/types/schemas'
import { isDate } from '@/utilities/dates'
import { isEmail, isJson, ValidationMethodFactory } from '@/utilities/validation'

export class SchemaPropertyString extends SchemaPropertyService {
  protected get validators(): ValidationMethodFactory[] {
    const { format } = this.property

    if (format === 'email') {
      return [isEmail]
    }

    if (format === 'json-string') {
      return [isJson]
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
      return this.property.default ?? null
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
        return this.withProps(DateInput)
      case 'date-time':
        return this.withProps(DateInput, { showTime: true })
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