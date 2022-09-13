import { Api, ApiRoute } from '@/services/Api'

export class HealthApi extends Api {

  protected override route: ApiRoute = '/health'

  public getHealth(): Promise<string> {
    return this.get('').then(({ data }) => data)
  }
}