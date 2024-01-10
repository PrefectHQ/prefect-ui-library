import { SelectOption } from '@prefecthq/prefect-design'
import { JsonInput } from '@/components'
import { InvalidSchemaValueError } from '@/models/InvalidSchemaValueError'
import { getSchemaPropertyAttrs, getSchemaPropertyComponentWithDefaultProps, getSchemaPropertyDefaultValidators, schemaPropertyComponentWithProps, SchemaPropertyComponentWithProps } from '@/services/schemas/utilities'
import { schemaHas, SchemaProperty, SchemaPropertyInputAttrs, SchemaPropertyMeta, SchemaValue } from '@/types/schemas'
import { Require } from '@/types/utilities'
import { sameValue } from '@/utilities'
import { isNumberArray, isStringArray } from '@/utilities/arrays'
import { ComponentDefinition } from '@/utilities/components'
import { fieldRules, isJson, ValidationMethod, ValidationMethodFactory } from '@/utilities/validation'

export type SchemaPropertyServiceSource = {
  property: SchemaProperty,
  level: number,
}

export type SchemaPropertyServiceConstructor = new (source: SchemaPropertyServiceSource) => SchemaPropertyService

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
  protected abstract get component(): SchemaPropertyComponentWithProps

  /**
   * Returns the value needed for the @property {PropertyComponentWithProps} property to be
   * rendered when no value exists or the value is invalid
   */
  protected abstract get default(): SchemaValue

  /**
   * Can be extended to add property specific validation rules. Implemented here because this is not required
   */
  protected get validators(): ValidationMethodFactory[] {
    return []
  }

  /**
   * Can be extended to add property specific attrs rules. Implemented here because this is not required
   */
  protected get attrs(): SchemaPropertyInputAttrs {
    return {}
  }

  protected property: SchemaProperty
  protected level: number
  protected withProps = schemaPropertyComponentWithProps

  public constructor({ property, level }: SchemaPropertyServiceSource) {
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

    try {
      return this.response(this.default)
    } catch (error) {
      if (!(error instanceof InvalidSchemaValueError)) {
        console.error(error)
      }
    }

    return this.default
  }

  public mapRequestValue(value: SchemaValue): SchemaValue | undefined {
    if (this.isDefaultValue(value)) {
      return undefined
    }

    return this.request(value)
  }

  public getDefaultValue(): SchemaValue {
    return this.default
  }

  public getComponent(): SchemaPropertyComponentWithProps {
    if (this.component === null) {
      return this.component
    }

    return getSchemaPropertyComponentWithDefaultProps(this.component)
  }

  public getValidators(required: boolean): ValidationMethod[] {
    const { title = 'Property' } = this.property
    const defaults = getSchemaPropertyDefaultValidators(this.property, required)
    const validators = fieldRules(title, ...this.validators)

    if (this.componentIs(JsonInput)) {
      validators.push(isJson(title))
    }

    return [...validators, ...defaults]
  }

  public getAttrs(): SchemaPropertyInputAttrs {
    const defaults = getSchemaPropertyAttrs(this.property)

    return { ...this.attrs, ...defaults }
  }

  public getMeta(required: boolean): SchemaPropertyMeta | null {
    const { component, props } = this.getComponent() ?? {}

    return {
      component,
      props,
      required,
      attrs: this.getAttrs(),
      validators: this.getValidators(required),
    }
  }

  protected componentIs(component: ComponentDefinition): boolean {
    return this.component?.component === component
  }

  protected invalid(): void {
    throw new InvalidSchemaValueError()
  }

  protected has<T extends keyof SchemaProperty>(key: T): this is { property: SchemaProperty & Require<SchemaProperty, T> } {
    return schemaHas(this.property, key)
  }

  protected getSelectOptions(): SelectOption[] {
    const options: SelectOption[] = []

    const propertyEnum = this.property.enum
    const itemsEnum = this.property.items?.enum

    if (!propertyEnum && !itemsEnum) {
      return options
    }

    if (!this.property.meta?.required && !this.property.default) {
      options.push({ label: 'None', value: null })
    }

    if (isStringArray(propertyEnum) || isNumberArray(propertyEnum)) {
      const mapped = propertyEnum.map<SelectOption>(value => ({ label: `${value}`, value }))

      options.push(...mapped)
    }

    if (isStringArray(itemsEnum) || isNumberArray(itemsEnum)) {
      const mapped = itemsEnum.map<SelectOption>(value => ({ label: `${value}`, value }))

      options.push(...mapped)
    }

    return options
  }

  protected isDefaultValue(value: SchemaValue): boolean {
    return sameValue(value, this.default)
  }

}