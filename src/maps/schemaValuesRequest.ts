import { MapFunction } from '@/services/Mapper'
import { Schema, SchemaProperty, SchemaValue, SchemaValues } from '@/types/schemas'
import { isDate } from '@/utilities'

type MapSchemaValuesSource = {
  values: SchemaValues,
  schema: Schema,
}

export const mapSchemaValuesRequestToSchemaValues: MapFunction<MapSchemaValuesSource, SchemaValues> = function({ values, schema }: MapSchemaValuesSource): SchemaValues {

  const formatSchemaValues = (values: SchemaValues, schema: Schema): SchemaValues => {
    return Object.keys(values).reduce<SchemaValues>((result, key) => {
      const property = getSchemaProperty(schema, key)

      if (property) {
        result[key] = formatSchemaValue(values[key], property)
      }

      return result
    }, {})
  }

  const formatSchemaValue = (value: SchemaValue, property: SchemaProperty): SchemaValue => {
    switch (property.type) {
      case 'string':
        return formatStringProperty(value, property)
      case undefined:
        return formatUnknownProperty(value)
      default:
        return value
    }
  }

  const getSchemaProperty = (schema: Schema, key: string): SchemaProperty | undefined => {
    return schema.properties?.[key]
  }

  const formatStringProperty = (value: SchemaValue, { format }: SchemaProperty): SchemaValue => {
    switch (format) {
      case 'date':
      case 'date-time':
        return formatDateValue(value)
      default:
        return value
    }
  }

  const formatDateValue = (value: SchemaValue): SchemaValue => {
    if (isDate(value)) {
      return this.map('Date', value as Date, 'string')
    }

    return value
  }

  const formatUnknownProperty = (value: SchemaValue): SchemaValue => {
    try {
      if (typeof value === 'string') {
        return JSON.parse(value)
      }
    } catch (error) {
      console.error(error)
    }

    return value
  }

  console.group()
  const response = formatSchemaValues(values, schema)
  console.groupEnd()

  return response
}

