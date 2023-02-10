import { ServerSettings } from '@/models/ServerSettings'
import { Api, ApiRoute } from '@/services/Api'


export class AdminApi extends Api {

  protected override route: ApiRoute = '/admin'

  public getSettings(): Promise<ServerSettings> {
    return this.get<ServerSettings>('/settings').then(({ data }) => data)
  }

  public async getVersion(): Promise<string> {
    return await this.get<string>('/version').then(({ data }) => data)
  }
}

