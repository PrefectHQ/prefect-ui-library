import { Variable, VariableCreate, VariableEdit, VariablesFilter } from '@/models'
import { VariableResponse } from '@/models/api/VariableResponse'
import { mapper } from '@/services'
import { WorkspaceApi } from '@/services/WorkspaceApi'

export class WorkspaceVariablesApi extends WorkspaceApi {
  protected override routePrefix = '/variables'

  public async getVariable(variableId: string): Promise<Variable | null> {
    const { data } = await this.get<VariableResponse | null>(`/${variableId}`)

    if (data) {
      return mapper.map('VariableResponse', data, 'Variable')
    }

    return null
  }

  public async getVariableByName(variableName: string): Promise<Variable | null> {
    const { data } = await this.get<VariableResponse | null>(`/name/${variableName}`)

    if (data) {
      return mapper.map('VariableResponse', data, 'Variable')
    }

    return null
  }

  public async getVariablesCount(filter: VariablesFilter = {}): Promise<number> {
    const request = mapper.map('VariablesFilter', filter, 'VariablesFilterRequest')
    const { data } = await this.post<number>('/count', request)
    return data
  }

  public async getVariables(filter: VariablesFilter = {}): Promise<Variable[]> {
    const request = mapper.map('VariablesFilter', filter, 'VariablesFilterRequest')
    const { data } = await this.post<VariableResponse[]>('/filter', request)
    return mapper.map('VariableResponse', data, 'Variable')
  }

  public async createVariable(body: VariableCreate): Promise<Variable> {
    const request = mapper.map('VariableCreate', body, 'VariableCreateRequest')
    const { data } = await this.post<VariableResponse>('/', request)

    return mapper.map('VariableResponse', data, 'Variable')
  }

  public async editVariable(variableId: string, body: VariableEdit): Promise<Variable> {
    const request = mapper.map('VariableEdit', body, 'VariableEditRequest')
    const { data } = await this.patch<VariableResponse>(`/${variableId}`, request)

    return mapper.map('VariableResponse', data, 'Variable')
  }

  public deleteVariable(variableId: string): Promise<void> {
    return this.delete(`/${variableId}`)
  }

}