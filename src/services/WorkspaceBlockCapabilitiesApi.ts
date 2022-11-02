import { WorkspaceApi } from './WorkspaceApi'

export interface IWorkspaceBlockCapabilitiesApi {
  getBlockCapabilities: () => Promise<string[]>,
}

export class WorkspaceBlockCapabilitiesApi extends WorkspaceApi implements IWorkspaceBlockCapabilitiesApi {

  protected override routePrefix = '/block_capabilities'

  public async getBlockCapabilities(): Promise<string[]> {
    const { data } = await this.get<string[]>('/')

    return data
  }

}