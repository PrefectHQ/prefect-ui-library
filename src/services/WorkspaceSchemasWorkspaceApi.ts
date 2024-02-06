import { mapper } from '@/schemas/mapper'
import { Schema } from '@/schemas/types/schema'
import { SchemaValues } from '@/schemas/types/schemaValues'
import { SchemaValuesValidationResponse } from '@/schemas/types/schemaValuesValidationResponse'
import { WorkspaceApi } from '@/services'

export class WorkspaceSchemasWorkspaceApi extends WorkspaceApi {

  protected override routePrefix = '/ui/schemas/'

  public async validate(schema: Schema, values: SchemaValues): Promise<SchemaValuesValidationResponse> {
    const { data } = await this.post<SchemaValuesValidationResponse>('/validate', {
      schema: mapper.map('Schema', schema, 'SchemaResponse'),
      values,
    })

    return data
  }
}