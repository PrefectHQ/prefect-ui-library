import { Api, ApiRoute } from '@/services/Api'

export class AdminApi extends Api {

  protected override route: ApiRoute = '/admin'

  public getSettings(): Promise<JSON> {
    return this.get('/settings').then(({ data }) => data)
  }

  public async getVersion(): Promise<number> {
    return await this.get('/version').then(({ data }) => data)
  }
}

