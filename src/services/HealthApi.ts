import { Api } from '@/services/Api'

export interface IHealthApi {
  getHealth: () => Promise<boolean>,
  isHealthy: () => Promise<boolean>,
}

export class HealthApi extends Api implements IHealthApi {
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