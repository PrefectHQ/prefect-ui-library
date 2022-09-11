import { PCombobox, PToggle, SelectOption } from '@prefecthq/prefect-design'
import { InvalidSchemaValueError } from '@/models/InvalidSchemaValueError'
import { schemaHas, SchemaProperty, SchemaValue } from '@/types/schemas'
import { Require } from '@/types/utilities'
import { isNumberArray, isStringArray } from '@/utilities/arrays'
import { withPropsWithoutExcludedFactory } from '@/utilities/components'

export type SchemaPropertyServiceSource = {
  property: SchemaProperty,
  level: number,
  maxPropertyLevel: number,
}

export type SchemaPropertyServiceConstructor = new (source: SchemaPropertyServiceSource) => SchemaPropertyService

const withProps = withPropsWithoutExcludedFactory('modelValue')

export type PropertyComponentWithProps = ReturnType<typeof withProps> | null

export abstract class SchemaPropertyService {
  /**
   * Converts a schema value from the ui into the correct value for the api
   */
  protected abstract request(value: SchemaValue): SchemaValue

  /**
   * Converts a schema value from the api into the correct value for the ui
   */
  protected abstract response(value: SchemaValue): SchemaValue

  /**
   * Returns the vue component and any props necessary to render the property in the schema form
   */
  public abstract get component(): PropertyComponentWithProps

  /**
   * Returns the value needed for the @property {PropertyComponentWithProps} property to be
   * rendered when no value exists or the value is invalid
   */
  public abstract get default(): SchemaValue

  protected readonly isMaxLevel: boolean
  protected property: SchemaProperty
  protected level: number
  protected withProps = withProps

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

  protected getSelectOptions(): SelectOption[] {
    const options: SelectOption[] = []

    if (!this.property.enum) {
      return options
    }

    if (!this.property.isRequired) {
      options.push({ label: 'None', value: null })
    }

    if (isStringArray(this.property.enum) || isNumberArray(this.property.enum)) {
      const mapped = this.property.enum.map<SelectOption>(value => ({ label: `${value}`, value }))

      options.push(...mapped)
    }

    return options
  }

}