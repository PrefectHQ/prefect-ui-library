import { InjectionKey } from 'vue'
import { Api, ApiRoute } from './Api'

export class BlockCapabilitiesApi extends Api {

  protected override route: ApiRoute = '/block_capabilities'

  public getBlockCapabilities(): Promise<string[]> {
    return this.get<string[]>('/').then(({ data }) => data)
  }

}

export const blockCapabilitiesApiKey: InjectionKey<BlockCapabilitiesApi> = Symbol('blockCapabilitiesApiKey')