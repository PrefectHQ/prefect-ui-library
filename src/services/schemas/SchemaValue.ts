import { SchemaValuesMapper, SchemaValuesServiceSource } from './SchemaValues'
import { InvalidSchemaValueError } from '@/models/InvalidSchemaValueError'
import { mapper } from '@/services/Mapper'
import { SchemaProperty, SchemaValue } from '@/types/schemas'

type Mapper = typeof mapper

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

  protected readonly map: Mapper['map']
  protected readonly mapEntries: Mapper['mapEntries']
  protected readonly mapRequest: SchemaValuesMapper['mapRequest']
  protected readonly mapResponse: SchemaValuesMapper['mapResponse']
  protected readonly isMaxLevel: boolean

  public constructor(source: Required<SchemaValuesServiceSource>) {
    const mapper = new SchemaValuesMapper(source)

    this.mapRequest = mapper.mapRequest.bind(mapper)
    this.mapResponse = mapper.mapResponse.bind(mapper)
    this.map = source.mapper.map.bind(source.mapper)
    this.mapEntries = source.mapper.mapEntries.bind(source.mapper)

    this.isMaxLevel = source.initialPropertyLevel > source.maxPropertyLevel
  }

  protected invalid(): void {
    new InvalidSchemaValueError()
  }
}