import { WorkspaceApi } from '@/services/WorkspaceApi'

export class WorkspaceBlockCapabilitiesApi extends WorkspaceApi {

  protected override routePrefix = '/block_capabilities'

  public async getBlockCapabilities(): Promise<string[]> {
    const { data } = await this.get<string[]>('/')

    return data
  }

}