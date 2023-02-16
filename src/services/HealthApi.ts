import { BaseApi } from '@/services/BaseApi'

export class HealthApi extends BaseApi {
  protected override routePrefix = '/health'

  public getHealth(): Promise<boolean> {
    return this.get<boolean>().then(({ data }) => data)
  }

  public async checkHealth(): Promise<boolean> {
    try {
      return await this.getHealth()
    } catch {
      return false
    }
  }
}