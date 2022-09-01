import { Api, ApiRoute } from '@/services/Api'

export class HealthApi extends Api {

  protected override route: ApiRoute = '/health'

  public getHealth(): Promise<any> {
    return this.get('/').then(({ data }) => data)
  }
}