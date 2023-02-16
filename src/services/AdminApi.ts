import { ServerSettings } from '@/models/ServerSettings'
import { BaseApi } from '@/services/BaseApi'

export class AdminApi extends BaseApi {
  protected override routePrefix = '/admin'

  public getSettings(): Promise<ServerSettings> {
    return this.get<ServerSettings>('/settings').then(({ data }) => data)
  }

  public async getVersion(): Promise<string> {
    return await this.get<string>('/version').then(({ data }) => data)
  }
}

