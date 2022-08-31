import { WorkspaceApi } from './WorkspaceApi'

export class WorkspaceBlockCapabilitiesApi extends WorkspaceApi {

  protected override prefix = '/block_capabilities'

  public async getBlockCapabilities(): Promise<string[]> {
    const { data } = await this.get<string[]>('/')

    return data
  }

}