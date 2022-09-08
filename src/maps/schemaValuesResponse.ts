import { isValid } from 'date-fns'
import { BlockDocumentReferenceResponse, BlockDocumentReferencesResponse, InvalidSchemaValueError } from '@/models'
import { MapFunction, mapper } from '@/services/Mapper'
import { isValidJsonString } from '@/services/validate'
import { isSchemaValues, Schema, schemaHas, SchemaProperty, SchemaValue, SchemaValues } from '@/types/schemas'
import { getSchemaPropertyDefaultValueForComponent, INITIAL_PROPERTY_LEVEL, MAX_PROPERTY_DEFAULT_VALUE, MAX_PROPERTY_LEVEL } from '@/utilities'
import { parseUnknownJson, stringifyUnknownJson } from '@/utilities/json'

type MapSchemaValuesSource = {
  values: SchemaValues,
  schema: Schema,
  blockDocumentReferences?: BlockDocumentReferencesResponse,
}

export const mapSchemaValuesResponseToSchemaValues: MapFunction<MapSchemaValuesSource, SchemaValues> = function(source: MapSchemaValuesSource): SchemaValues {
  const parser = new SchemaValuesParser(source, this)

  return parser.parsed
}

class SchemaValuesParser {
  private readonly blockDocumentReferences: BlockDocumentReferencesResponse | undefined
  private readonly mapper: typeof mapper
  private readonly _parsed: SchemaValues

  public constructor(source: MapSchemaValuesSource, map: typeof mapper) {
    if (source.blockDocumentReferences) {
      this.blockDocumentReferences = source.blockDocumentReferences
    }

    this.mapper = map
    this._parsed = this.parseSchemaValues(source.values, source.schema)
  }

  public get parsed(): Schema {
    return this._parsed
  }

  private parseSchemaValues(values: SchemaValues, schema: SchemaProperty, level: number = INITIAL_PROPERTY_LEVEL): SchemaValues {
    const properties = schema.properties ?? {}

    return Object.keys(properties).reduce<SchemaValues>((result, key) => {
      const blockDocumentReference = this.getSchemaBlockDocumentReference(key)

      if (blockDocumentReference) {
        result[key] = blockDocumentReference.block_document.id

        return result
      }

      const property = this.getSchemaProperty(schema, key)

      if (property) {
        result[key] = this.parseSchemaValue(values[key], property, level + 1)
      }

      return result
    }, {})
  }

  private parseSchemaValue(value: SchemaValue, property: SchemaProperty, level: number = INITIAL_PROPERTY_LEVEL): SchemaValue {
    if (property.type === 'object' && level > MAX_PROPERTY_LEVEL) {
      return this.parseMaxLevelProperty(value)
    }

    try {
      switch (property.type) {
        case 'object':
          return this.parseObjectProperty(value, property, level)
        case 'array':
          return this.parseArrayProperty(value, property)
        case 'string':
          return this.parseStringProperty(value, property)
        case undefined:
          return this.parseUnknownProperty(value)
        case 'integer':
          return this.parseInteger(value)
        case 'number':
          return this.parseNumber(value)
        case 'boolean':
          return this.parseBoolean(value)
        case 'null':
        default:
          return value
      }
    } catch (error) {
      this.handleError(error)
    }

    return getSchemaPropertyDefaultValueForComponent(property, level)
  }

  private getSchemaProperty(schema: Schema, key: string): SchemaProperty | undefined {
    return schema.properties?.[key]
  }

  private getSchemaBlockDocumentReference(key: string): BlockDocumentReferenceResponse | undefined {
    return this.blockDocumentReferences?.[key]
  }

  private parseMaxLevelProperty(value: SchemaValue): string {
    // typescript is just wrong. JSON.stringify can return null or undefined
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    return stringifyUnknownJson(value) ?? MAX_PROPERTY_DEFAULT_VALUE
  }

  private parseObjectProperty(value: SchemaValue, property: SchemaProperty, level: number): Record<string, unknown> | null {
    const defaultValue = getSchemaPropertyDefaultValueForComponent(property, level)

    if (!schemaHas(property, 'properties')) {
      return defaultValue
    }

    try {
      const parsed = parseUnknownJson(value)

      if (!isSchemaValues(parsed)) {
        throw new InvalidSchemaValueError()
      }

      return this.parseSchemaValues(parsed, property, level)
    } catch (error) {
      this.handleError(error)
    }

    return this.parseSchemaValues(defaultValue, property, level)
  }

  private parseArrayProperty(values: SchemaValue, property: SchemaProperty): unknown[] {
    if (!Array.isArray(values) || !schemaHas(property, 'items')) {
      throw new InvalidSchemaValueError()
    }

    return values.map(value => this.parseSchemaValue(value, property.items))
  }

  private parseStringProperty(value: SchemaValue, property: SchemaProperty): string | Date | null {
    if (typeof value !== 'string') {
      throw new InvalidSchemaValueError()
    }

    switch (property.format) {
      case 'date':
      case 'date-time':
        return this.parseDateValue(property, value)
      default:
        return value
    }
  }

  private parseDateValue(property: SchemaProperty, value: SchemaValue): Date {
    const date = this.mapper.map('string', value as string, 'Date')

    if (!isValid(date)) {
      throw new InvalidSchemaValueError()
    }

    return date
  }

  private parseUnknownProperty(value: SchemaValue): SchemaValue {
    if (!isValidJsonString(value)) {
      return JSON.stringify(value)
    }

    return value
  }

  private parseInteger(value: SchemaValue): number | null {
    const result = parseInt(value as string)

    if (isNaN(result)) {
      throw new InvalidSchemaValueError()
    }

    return result
  }

  private parseNumber(value: SchemaValue): number | null {
    const result = parseFloat(value as string)

    if (isNaN(result)) {
      throw new InvalidSchemaValueError()
    }

    return result
  }

  private parseBoolean(value: SchemaValue): boolean | null {
    if (typeof value === 'string') {
      if (value.toLowerCase() === 'true') {
        return true
      }

      if (value.toLowerCase() === 'false') {
        return false
      }
    }

    if (typeof value !== 'boolean') {
      throw new InvalidSchemaValueError()
    }

    return value
  }

  private handleError(error: unknown): void {
    if (error instanceof InvalidSchemaValueError) {
      return
    }

    console.error(error)
  }
}