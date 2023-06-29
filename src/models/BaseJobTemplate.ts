import { SchemaResponse } from '@/models/api'
import { mapper } from '@/services'
import { Schema } from '@/types'

export type JobConfiguration = Record<string, unknown>

export interface IBaseJobTemplate {
  jobConfiguration: JobConfiguration,
  variables: SchemaResponse,
}

export class BaseJobTemplate implements IBaseJobTemplate {
  public jobConfiguration: JobConfiguration
  public variables: SchemaResponse

  private internalSchema?: Schema
  public get schema(): Schema {
    if (this.internalSchema === undefined) {
      this.internalSchema = mapper.map('SchemaResponse', this.variables, 'Schema')
    }

    return this.internalSchema
  }
  public set schema(value: SchemaResponse) {
    this.variables = value
    this.internalSchema = mapper.map('SchemaResponse', this.variables, 'Schema')
  }

  public constructor(baseJobTemplate: IBaseJobTemplate) {
    this.jobConfiguration = baseJobTemplate.jobConfiguration
    this.variables = baseJobTemplate.variables
  }

}