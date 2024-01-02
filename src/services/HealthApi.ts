import { Api } from '@/services/Api'

export class HealthApi extends Api {
  protected override routePrefix = '/health'

  public getHealth(): Promise<boolean> {
    return this.get<boolean>().then(({ data }) => data)
  }

  public async isHealthy(): Promise<boolean> {
    try {
      return await this.getHealth()
    } catch {
      return false
    }
  }
}