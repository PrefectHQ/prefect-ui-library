import { isRecord } from '..'
import { mapper } from '@/schemas/mapper'
import { Schema, SchemaProperty } from '@/schemas/types/schema'
import { SchemaValue, SchemaValues } from '@/schemas/types/schemaValues'
import { SchemaValuesValidationResponse } from '@/schemas/types/schemaValuesValidationResponse'
import { WorkspaceApi, mocker } from '@/services'

export class WorkspaceSchemasWorkspaceApi extends WorkspaceApi {

  protected override routePrefix = '/ui/schemas/'

  public async validateSchemaValues(values: SchemaValues, schema: Schema): Promise<SchemaValuesValidationResponse> {
    const { data } = await this.post<SchemaValuesValidationResponse>('/validate', {
      schema: mapper.map('Schema', schema, 'SchemaResponse'),
      values,
    })

    return data
  }

  public async validateSchemaValue(value: SchemaValue, property: SchemaProperty, schema: Schema): Promise<SchemaValuesValidationResponse> {
    const propertyName = mocker.create('noun')
    const propertySchema: Schema = {
      definitions: schema.definitions,
      properties: {
        [propertyName]: property,
      },
    }

    const values: SchemaValues = {
      [propertyName]: value,
    }

    const response = await this.validateSchemaValues(values, propertySchema)

    if (!response.valid) {
      const [errors] = response.errors

      if (!isRecord(errors)) {
        throw new Error('Unexpected schema validation error response')
      }

      return {
        valid: false,
        errors: errors.errors,
      }
    }

    return response
  }

}