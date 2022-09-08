import { BlockDocumentReferenceValue } from '@/models/api/BlockDocumentCreateRequest'
import { MapFunction, mapper } from '@/services/Mapper'
import { Schema, SchemaProperty, SchemaValue, SchemaValues } from '@/types/schemas'
import { INITIAL_PROPERTY_LEVEL, isDate, isSchemaPropertyDefaultValueForComponent, MAX_PROPERTY_DEFAULT_VALUE, MAX_PROPERTY_LEVEL } from '@/utilities'
import { parseUnknownJson } from '@/utilities/json'

type MapSchemaValuesSource = {
  values: SchemaValues,
  schema: Schema,
}

export const mapSchemaValuesToSchemaValuesRequest: MapFunction<MapSchemaValuesSource, SchemaValues> = function(source: MapSchemaValuesSource): SchemaValues {
  const formatter = new SchemaValuesFormatter(source, this)

  return formatter.formatted
}

class SchemaValuesFormatter {
  private readonly mapper: typeof mapper
  private readonly _formatted: SchemaValues

  public constructor(source: MapSchemaValuesSource, map: typeof mapper) {
    this.mapper = map
    this._formatted = this.formatSchemaValues(source.values, source.schema)
  }

  public get formatted(): Schema {
    return this._formatted
  }

  private formatSchemaValues(values: SchemaValues, schema: Schema, level: number = INITIAL_PROPERTY_LEVEL): SchemaValues {
    return Object.keys(values).reduce<SchemaValues>((result, key) => {
      const property = this.getSchemaProperty(schema, key)
      const propertyLevel = level + 1

      if (property) {
        const value = this.formatSchemaValue(values[key], property, propertyLevel)

        if (!isSchemaPropertyDefaultValueForComponent(property, value, propertyLevel)) {
          result[key] = value
        }
      }

      return result
    }, {})
  }

  private formatSchemaValue(value: SchemaValue, property: SchemaProperty, level: number = INITIAL_PROPERTY_LEVEL): SchemaValue {
    if (property.type === 'object' && level > MAX_PROPERTY_LEVEL) {
      return this.formatMaxLevelProperty(value)
    }

    if (property.blockReference) {
      return this.formatBlockReferenceProperty(value)
    }

    switch (property.type) {
      case 'object':
        return this.formatObjectProperty(value, property, level)
      case 'string':
        return this.formatStringProperty(value, property)
      case undefined:
        return this.formatUnknownProperty(value)
      default:
        return value
    }
  }

  private getSchemaProperty(schema: Schema, key: string): SchemaProperty | undefined {
    return schema.properties?.[key]
  }

  private formatMaxLevelProperty(value: SchemaValue): unknown {
    return parseUnknownJson(value) ?? MAX_PROPERTY_DEFAULT_VALUE
  }

  private formatBlockReferenceProperty(value: SchemaValue): BlockDocumentReferenceValue | unknown {
    if (!value) {
      return value
    }

    return {
      $ref: {
        // eslint-disable-next-line camelcase
        block_document_id: value as string,
      },
    }
  }

  private formatObjectProperty(value: SchemaValue, property: SchemaProperty, level: number): SchemaValue {
    if (typeof value === 'string') {
      return parseUnknownJson(value)
    }

    return this.formatSchemaValues(value as SchemaValues, property, level)
  }

  private formatStringProperty(value: SchemaValue, { format }: SchemaProperty): SchemaValue {
    switch (format) {
      case 'date':
      case 'date-time':
        return this.formatDateValue(value)
      default:
        return value
    }
  }

  private formatDateValue(value: SchemaValue): SchemaValue {
    if (isDate(value)) {
      return this.mapper.map('Date', value as Date, 'string')
    }

    return value
  }

  private formatUnknownProperty(value: SchemaValue): SchemaValue {
    try {
      if (typeof value === 'string') {
        return JSON.parse(value)
      }
    } catch (error) {
      console.error(error)
    }

    return value
  }
}