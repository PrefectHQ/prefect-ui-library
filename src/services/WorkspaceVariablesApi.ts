import { Variable, VariableCreate, VariableEdit } from '@/models'
import { VariableResponse } from '@/models/api/VariableResponse'
import { mapper } from '@/services'
import { WorkspaceApi } from '@/services/WorkspaceApi'

export interface IWorkspaceVariablesApi {
  // TODO: Bulk route doesn't exist yet, will soon
  // getVariables: (filter: VariablesFilter) => Promise<Variable[]>,
  getVariable: (variableId: string) => Promise<Variable>,
  createVariable: (body: VariableCreate) => Promise<Variable>,
  editVariable: (variableId: string, body: VariableEdit) => Promise<Variable>,
  deleteVariable: (variableId: string) => Promise<void>,
}

export class WorkspaceVariablesApi extends WorkspaceApi implements IWorkspaceVariablesApi {
  protected override routePrefix = '/variables'

  public async getVariable(variableId: string): Promise<Variable> {
    const { data } = await this.get<VariableResponse>(`/${variableId}`)
    return mapper.map('VariableResponse', data, 'Variable')
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

  public deleteVariable(variableId: string): Promise<void> {
    return this.delete(`/${variableId}`)
  }
}