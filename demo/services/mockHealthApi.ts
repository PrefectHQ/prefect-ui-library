import { IHealthApi } from '@/services/HealthApi'

export class MockHealthApi implements IHealthApi {

  public getHealth(): Promise<boolean> {
    throw new Error('Not Implemented')
  }

  public isHealthy(): Promise<boolean> {
    throw new Error('Not Implemented')
  }
}