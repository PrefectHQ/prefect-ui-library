import { BaseApi } from '@/services/BaseApi'

export class HealthApi extends BaseApi {
  protected override routePrefix = '/health'

  public getHealth(): Promise<string> {
    return this.get<string>().then(({ data }) => data)
  }
}