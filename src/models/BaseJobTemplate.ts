import { SchemaPropertiesResponse, SchemaResponse } from '@/models/api'
import { mapper } from '@/services'
import { Schema, SchemaValues } from '@/types'

export type JobConfiguration = Record<string, unknown>

export interface IBaseJobTemplate {
  jobConfiguration?: JobConfiguration,
  variables?: SchemaResponse,
}

export class BaseJobTemplate implements IBaseJobTemplate {
  public jobConfiguration?: JobConfiguration
  public variables?: SchemaResponse

  private internalSchema?: Schema
  public get schema(): Schema {
    if (this.internalSchema === undefined) {
      this.internalSchema = mapper.map('SchemaResponse', this.variables, 'Schema')
    }

    return this.internalSchema ?? {}
  }
  public set schema(value: SchemaResponse) {
    this.variables = value
    this.internalSchema = mapper.map('SchemaResponse', this.variables, 'Schema')
  }

  public get defaultValues(): SchemaValues {
    return Object.entries(this.variables?.properties ?? {}).reduce<SchemaValues>((acc, [key, value]) => {
      acc[key] = value?.default
      return acc
    }, {})
  }

  public set defaultValues(values: SchemaValues) {
    if (!this.variables?.properties) {
      return
    }

    const unmappedValues = mapper.map('SchemaValues', { values: values, schema: this.schema }, 'SchemaValuesRequest')

    const keys = Object.entries(this.variables.properties)

    this.variables.properties = keys.reduce<SchemaPropertiesResponse>((acc, [key, value]) => {
      if (value) {
        value.default = unmappedValues[key]
      }

      acc[key] = value
      return acc
    }, {})
  }

  public constructor(baseJobTemplate: IBaseJobTemplate) {
    this.jobConfiguration = baseJobTemplate.jobConfiguration
    this.variables = baseJobTemplate.variables
  }

}