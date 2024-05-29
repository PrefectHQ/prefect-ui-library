import { Variable, VariableCreate, VariableEdit, VariableV2, VariableV2Create, VariableV2Edit, VariablesFilter } from '@/models'
import { VariableResponse } from '@/models/api/VariableResponse'
import { VariableV2Response } from '@/models/api/VariableV2Response'
import { mapper } from '@/services'
import { WorkspaceApi } from '@/services/WorkspaceApi'

export class WorkspaceVariablesApi extends WorkspaceApi {
  protected override routePrefix = '/variables'

  public async getVariable(variableId: string): Promise<Variable> {
    const { data } = await this.get<VariableResponse>(`/${variableId}`)
    return mapper.map('VariableResponse', data, 'Variable')
  }

  public async getVariableByName(variableName: string): Promise<Variable | null> {
    const { data } = await this.get<VariableResponse | null>(`/name/${variableName}`)
    if (data) {
      return mapper.map('VariableResponse', data, 'Variable')
    }

    return null
  }

  public async getVariables(filter: VariablesFilter = {}): Promise<Variable[]> {
    const request = mapper.map('VariablesFilter', filter, 'VariablesFilterRequest')
    const { data } = await this.post<VariableResponse[]>('/filter', request)
    return mapper.map('VariableResponse', data, 'Variable')
  }

  public async getVariablesCount(filter: VariablesFilter = {}): Promise<number> {
    const request = mapper.map('VariablesFilter', filter, 'VariablesFilterRequest')
    const { data } = await this.post<number>('/count', request)
    return data
  }

  public async createVariable(body: VariableCreate): Promise<Variable> {
    const requestBody = mapper.map('VariableCreate', body, 'VariableCreateRequest')
    const { data } = await this.post<VariableResponse>('/', requestBody)
    return mapper.map('VariableResponse', data, 'Variable')
  }

  public async editVariable(variableId: string, body: VariableEdit): Promise<Variable> {
    const requestBody = mapper.map('VariableEdit', body, 'VariableEditRequest')
    const { data } = await this.patch<VariableResponse>(`/${variableId}`, requestBody)

    return mapper.map('VariableResponse', data, 'Variable')
  }

  public async getVariablesV2(filter: VariablesFilter = {}): Promise<VariableV2[]> {
    const request = mapper.map('VariablesFilter', filter, 'VariablesFilterRequest')
    const { data } = await this.post<VariableV2Response[]>('/filter', request)
    return mapper.map('VariableV2Response', data, 'VariableV2')
  }

  public async createVariableV2(body: VariableV2Create): Promise<VariableV2> {
    const requestBody = mapper.map('VariableV2Create', body, 'VariableV2CreateRequest')
    const { data } = await this.post<VariableResponse>('/', requestBody)
    return mapper.map('VariableV2Response', data, 'VariableV2')
  }

  public async editVariableV2(variableId: string, body: VariableV2Edit): Promise<VariableV2> {
    const requestBody = mapper.map('VariableV2Edit', body, 'VariableV2EditRequest')
    const { data } = await this.patch<VariableV2Response>(`/${variableId}`, requestBody)

    return mapper.map('VariableV2Response', data, 'VariableV2')
  }

  public deleteVariable(variableId: string): Promise<void> {
    return this.delete(`/${variableId}`)
  }


}