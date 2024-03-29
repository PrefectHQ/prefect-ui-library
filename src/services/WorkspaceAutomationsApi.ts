import { Automation } from '@/automations/types/automation'
import { WorkspaceApi } from '@/services/WorkspaceApi'

export class WorkspaceAutomationsApi extends WorkspaceApi {

  public getAutomations(): Promise<Automation[]> {
    throw 'not implemented'
  }

}