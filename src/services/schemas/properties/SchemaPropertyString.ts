import { PNumberInput, PSelect, PTextInput, PDateInput } from '@prefecthq/prefect-design'
import { format, isValid, parseISO } from 'date-fns'
import DateInput from '@/components/DateInput.vue'
import JsonInput from '@/components/JsonInput.vue'
import { InvalidSchemaValueError } from '@/models'
import { SchemaPropertyService } from '@/services/schemas/properties/SchemaPropertyService'
import { SchemaPropertyComponentWithProps } from '@/services/schemas/utilities'
import { SchemaValue } from '@/types/schemas'
import { isDate } from '@/utilities/dates'
import { stringifyUnknownJson } from '@/utilities/stringifyUnknownJson'
import { isString } from '@/utilities/strings'
import { isEmail, isJson, ValidationMethodFactory } from '@/utilities/validation'

export class SchemaPropertyString extends SchemaPropertyService {

  protected override get component(): SchemaPropertyComponentWithProps {
    if (this.has('enum')) {
      return this.withProps(PSelect, {
        options: this.getSelectOptions(),
      })
    }

    switch (this.property.format) {
      case 'date':
        // date uses PDateInput because timezone SHOULD NOT be factored into a date string
        return this.withProps(PDateInput)
      case 'date-time':
        // date-time uses DateInput because timezone SHOULD be factored into a date-time string
        return this.withProps(DateInput, { showTime: true })
      case 'json-string':
        return this.withProps(JsonInput)
      case 'time-delta':
        return this.withProps(PNumberInput)
      default:
        return this.withProps(PTextInput)
    }
  }

  protected override get default(): SchemaValue {
    if (this.componentIs(PSelect)) {
      return this.property.default ?? null
    }

    if (this.componentIs(DateInput) || this.componentIs(PDateInput)) {
      return isString(this.property.default) ? parseISO(this.property.default) : null
    }

    if (this.componentIs(JsonInput)) {
      return stringifyUnknownJson(this.property.default) ?? ''
    }

    if (this.componentIs(PNumberInput)) {
      return this.property.default ?? null
    }

    return this.property.default ?? ''
  }

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
    if (!isString(value)) {
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

  private requestDateValue(value: SchemaValue): SchemaValue {
    if (isDate(value)) {
      return format(value, 'yyyy-MM-dd')
    }

    return value
  }

  private responseDateValue(value: SchemaValue): SchemaValue {
    if (!isString(value)) {
      throw new InvalidSchemaValueError()
    }

    const date = parseISO(value)

    if (!isValid(date)) {
      return this.invalid()
    }

    return date
  }

  private requestDateTimeValue(value: SchemaValue): SchemaValue {
    if (isDate(value)) {
      return value.toISOString()
    }

    return value
  }

  private responseDateTimeValue(value: SchemaValue): Date {
    if (!isString(value)) {
      throw new InvalidSchemaValueError()
    }

    const date = parseISO(value)

    if (!isValid(date)) {
      this.invalid()
    }

    return date
  }
}