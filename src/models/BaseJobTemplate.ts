import { SchemaResponse } from '@/models/api'
// import { getSchemaDefaultValues, mapper } from '@/services'
// import { Schema, SchemaValues } from '@/types'

export type JobConfiguration = Record<string, unknown>
export type BaseJobTemplateVariables = SchemaResponse

export interface IBaseJobTemplate {
  jobConfiguration?: JobConfiguration,
  variables?: BaseJobTemplateVariables,
}

export class BaseJobTemplate implements IBaseJobTemplate {
  public jobConfiguration?: JobConfiguration
  public variables?: BaseJobTemplateVariables

  // private internalVariables?: SchemaResponse
  // public get variables(): SchemaResponse | undefined {
  //   return this.internalVariables
  // }

  // public set variables(value: SchemaResponse | undefined) {
  //   this.internalVariables = value
  //   this.internalSchema = mapper.map('SchemaResponse', this.internalVariables, 'Schema')
  // }

  // private internalSchema?: Schema
  // public get schema(): Schema {
  //   return this.internalSchema ?? {}
  // }

  // public get defaultValues(): SchemaValues {
  //   return {}
  //   // return getSchemaDefaultValues(this.schema)
  // }

  // public set defaultValues(values: SchemaValues) {
  //   if (!this.variables?.properties) {
  //     return
  //   }

  //   const unmappedValues = mapper.map('SchemaValues', { values: values, schema: this.schema }, 'SchemaValuesRequest')

  //   const keys = Object.entries(this.variables.properties)

  //   const properties = keys.reduce<SchemaPropertiesResponse>((acc, [key, value]) => {
  //     if (value) {
  //       value.default = unmappedValues[key]
  //     }

  //     acc[key] = value
  //     return acc
  //   }, {})

  //   this.variables = { ...this.variables, properties }
  // }

  public constructor(baseJobTemplate: IBaseJobTemplate) {
    this.jobConfiguration = baseJobTemplate.jobConfiguration
    this.variables = baseJobTemplate.variables
  }
}