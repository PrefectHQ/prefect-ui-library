import { Variable } from '@/models/Variable'
import { IWorkspaceVariablesApi } from '@/services/WorkspaceVariablesApi'

export class MockWorkspaceVariablesApi implements IWorkspaceVariablesApi {

  public getVariable(): Promise<Variable> {
    throw new Error('Not Implemented')
  }

  public getVariableByName(): Promise<Variable | null> {
    throw new Error('Not Implemented')
  }

  public getVariables(): Promise<Variable[]> {
    throw new Error('Not Implemented')
  }

  public getVariablesCount(): Promise<number> {
    throw new Error('Not Implemented')
  }

  public createVariable(): Promise<Variable> {
    throw new Error('Not Implemented')
  }

  public editVariable(): Promise<Variable> {
    throw new Error('Not Implemented')
  }

  public deleteVariable(): Promise<void> {
    throw new Error('Not Implemented')
  }
}