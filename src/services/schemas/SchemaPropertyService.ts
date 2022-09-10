import { InvalidSchemaValueError } from '@/models/InvalidSchemaValueError'
import { schemaHas, SchemaProperty, SchemaValue } from '@/types/schemas'
import { Require } from '@/types/utilities'

export type SchemaPropertyServiceSource = {
  property: SchemaProperty,
  level: number,
  maxPropertyLevel: number,
}

export type SchemaPropertyServiceConstructor = new (source: SchemaPropertyServiceSource) => SchemaPropertyService

export abstract class SchemaPropertyService {
  protected abstract request(value: SchemaValue): SchemaValue
  protected abstract response(value: SchemaValue): SchemaValue
  protected abstract get default(): SchemaValue

  protected readonly isMaxLevel: boolean
  protected property: SchemaProperty
  protected level: number

  public constructor({ property, level, maxPropertyLevel }: SchemaPropertyServiceSource) {
    this.isMaxLevel = level > maxPropertyLevel
    this.property = property
    this.level = level
  }

  public mapResponseValue(value: SchemaValue): SchemaValue {
    try {
      return this.response(value)
    } catch (error) {
      if (!(error instanceof InvalidSchemaValueError)) {
        console.error(error)
      }
    }

    return this.default
  }

  public mapRequestValue(value: SchemaValue): SchemaValue | undefined {
    const mappedValue = this.request(value)

    if (mappedValue === this.default) {
      return undefined
    }

    return mappedValue
  }

  protected invalid(): void {
    throw new InvalidSchemaValueError()
  }

  protected has<T extends keyof SchemaProperty>(key: T): this is { property: SchemaProperty & Require<SchemaProperty, T> } {
    return schemaHas(this.property, key)
  }

}