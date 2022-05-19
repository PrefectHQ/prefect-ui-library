import { ISettingsResponse } from '@/models/ISettingsResponse'
import { Api, ApiRoute } from '@/services/Api'


export class AdminApi extends Api {

  protected override route: ApiRoute = '/admin'

  public getSettings(): Promise<ISettingsResponse> {
    return this.get<ISettingsResponse>('/settings').then(({ data }) => data)
  }

  public async getVersion(): Promise<string> {
    return await this.get<string>('/version').then(({ data }) => data)
  }
}

