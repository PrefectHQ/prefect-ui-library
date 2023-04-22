import { PNumberInput, PSelect, PTextarea } from '@prefecthq/prefect-design'
import DateInput from '@/components/DateInput.vue'
import JsonInput from '@/components/JsonInput.vue'
import { isString, mapper, stringifyUnknownJson } from '@/index'
import { InvalidSchemaValueError } from '@/models'
import { SchemaPropertyService } from '@/services/schemas/properties/SchemaPropertyService'
import { SchemaPropertyComponentWithProps } from '@/services/schemas/utilities'
import { SchemaValue } from '@/types/schemas'
import { isDate } from '@/utilities/dates'
import { dateFunctions } from '@/utilities/timezone'
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
        return this.withProps(DateInput)
      case 'date-time':
        return this.withProps(DateInput, { showTime: true })
      case 'json-string':
        return this.withProps(JsonInput)
      case 'time-delta':
        return this.withProps(PNumberInput)
      default:
        return this.withProps(PTextarea)
    }
  }

  protected override get default(): SchemaValue {
    if (this.componentIs(PSelect)) {
      return this.property.default ?? null
    }

    if (this.componentIs(DateInput)) {
      return isString(this.property.default) ? new Date(this.property.default) : null
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

  private requestDateValue(value: SchemaValue): SchemaValue {
    if (isDate(value)) {
      return dateFunctions.format(value, 'yyyy-MM-dd')
    }

    return value
  }

  private responseDateValue(value: SchemaValue): SchemaValue {
    const date = dateFunctions.parse(value as string, 'yyyy-MM-dd', new Date())

    if (!dateFunctions.isValid(date)) {
      return this.invalid()
    }

    return date
  }

  private requestDateTimeValue(value: SchemaValue): SchemaValue {
    if (isDate(value)) {
      return dateFunctions.format(value, 'yyyy-MM-dd\'T\'HH:mm:ss.000\'Z\'')
    }

    return value
  }

  private responseDateTimeValue(value: SchemaValue): Date {
    const date = dateFunctions.parseISO(value as string)

    if (!dateFunctions.isValid(date)) {
      this.invalid()
    }

    return date
  }
}