import { MapFunction } from '@/services/Mapper'
import { Schema, SchemaProperty, SchemaValue, SchemaValues } from '@/types/schemas'
import { INITIAL_PROPERTY_LEVEL, isDate, isSchemaPropertyDefaultValueForComponent, MAX_PROPERTY_DEFAULT_VALUE, MAX_PROPERTY_LEVEL } from '@/utilities'
import { parseUnknownJson } from '@/utilities/json'

type MapSchemaValuesSource = {
  values: SchemaValues,
  schema: Schema,
}

export const mapSchemaValuesToSchemaValuesRequest: MapFunction<MapSchemaValuesSource, SchemaValues> = function({ values, schema }: MapSchemaValuesSource): SchemaValues {

  const formatSchemaValues = (values: SchemaValues, schema: Schema, level: number = INITIAL_PROPERTY_LEVEL): SchemaValues => {
    return Object.keys(values).reduce<SchemaValues>((result, key) => {
      const property = getSchemaProperty(schema, key)
      const propertyLevel = level + 1

      if (property) {
        const value = formatSchemaValue(values[key], property, propertyLevel)

        if (!isSchemaPropertyDefaultValueForComponent(property, value, propertyLevel)) {
          result[key] = value
        }
      }

      return result
    }, {})
  }

  const formatSchemaValue = (value: SchemaValue, property: SchemaProperty, level: number = INITIAL_PROPERTY_LEVEL): SchemaValue => {
    if (property.type === 'object' && level > MAX_PROPERTY_LEVEL) {
      return formatMaxLevelProperty(value)
    }

    switch (property.type) {
      case 'object':
        return formatObjectProperty(value, property, level)
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

  const formatMaxLevelProperty = (value: SchemaValue): unknown => {
    return parseUnknownJson(value) ?? MAX_PROPERTY_DEFAULT_VALUE
  }

  const formatObjectProperty = (value: SchemaValue, property: SchemaProperty, level: number): SchemaValue => {
    if (typeof value === 'string') {
      return parseUnknownJson(value)
    }

    return formatSchemaValues(value as SchemaValues, property, level)
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

  return formatSchemaValues(values, schema)
}

