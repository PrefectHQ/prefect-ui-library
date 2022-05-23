import { Api } from '@/services/Api'

export class MockedApi extends Api {
  protected promise<T = any>(data: T): Promise<T> {
    return new Promise((res) => res(data))
  }

  protected void(): Promise<void> {
    return Promise.resolve()
  }
}