import { MockApi } from './MockApi'
import { IWorkspaceBlockCapabilitiesApi } from '@/services'

export class MockWorkspaceBlockCapabilitiesApi extends MockApi implements IWorkspaceBlockCapabilitiesApi {

  public async getBlockCapabilities(): Promise<string[]> {
    return await this.blockSchemaCapabilities.getAll()
  }

}