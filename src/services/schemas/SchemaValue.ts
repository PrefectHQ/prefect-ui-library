import { SchemaValuesMapper, SchemaValuesServiceSource } from './SchemaValues'
import { InvalidSchemaValueError } from '@/models/InvalidSchemaValueError'
import { SchemaProperty, SchemaValue } from '@/types/schemas'

type SchemaValueMapperValues = {
  property: SchemaProperty,
  value: SchemaValue,
  level: number,
}

export type SchemaValueRequest = SchemaValueMapperValues
export type SchemaValueResponse = SchemaValueMapperValues

export abstract class SchemaValueMapper {
  public abstract request(request: SchemaValueRequest): SchemaValue
  public abstract response(response: SchemaValueResponse): SchemaValue
  public abstract default(property: SchemaProperty): SchemaValue

  protected readonly mapRequestValues: SchemaValuesMapper['mapRequestValues']
  protected readonly mapResponseValues: SchemaValuesMapper['mapResponseValues']
  protected readonly isMaxLevel: boolean

  public constructor(source: Required<SchemaValuesServiceSource>) {
    const service = new SchemaValuesMapper(source)

    this.mapRequestValues = service.mapRequestValues.bind(service)
    this.mapResponseValues = service.mapResponseValues.bind(service)

    this.isMaxLevel = source.initialPropertyLevel > source.maxPropertyLevel
  }

  protected invalid(): void {
    new InvalidSchemaValueError()
  }
}