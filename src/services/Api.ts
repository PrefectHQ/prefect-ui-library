import { asArray } from '@prefecthq/prefect-design'
import axios, { AxiosInstance, AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from 'axios'
import { MaybeArray } from '@/types/utilities'
import { isDefined } from '@/utilities/variables'

export type PrefectConfig = {
  baseUrl: string,
  token?: string,
}

type ConfigFunction<R, T extends PrefectConfig = PrefectConfig> = (config: T) => R
export type ApiBaseUrl<T extends PrefectConfig = PrefectConfig> = string | ConfigFunction<string, T>
export type ApiHeaders<T extends PrefectConfig = PrefectConfig> = AxiosRequestHeaders | ConfigFunction<AxiosRequestHeaders, T>

export const getPrefectBaseUrl: ApiBaseUrl = (config) => config.baseUrl

export const getPrefectUIHeaders: ApiHeaders = { 'X-PREFECT-UI': true }

export const getAuthorizationHeaders: ApiHeaders = (config) => {
  const value: AxiosRequestHeaders = {}

  if (config.token) {
    value.Authorization = `bearer ${config.token}`
  }

  return value
}

export class Api<T extends PrefectConfig = PrefectConfig> {
  protected readonly apiConfig: T
  protected apiHeaders: MaybeArray<ApiHeaders> = [getPrefectUIHeaders, getAuthorizationHeaders]
  protected apiBaseUrl: ApiBaseUrl = getPrefectBaseUrl
  protected routePrefix: string | undefined

  public constructor(apiConfig: T) {
    this.apiConfig = apiConfig
  }

  protected composeBaseUrl(): string {
    if (typeof this.apiBaseUrl === 'string') {
      return this.apiBaseUrl
    }

    return this.apiBaseUrl(this.apiConfig)
  }

  protected composeHeaders(): AxiosRequestHeaders {
    const array = asArray(this.apiHeaders)

    return array.reduce<AxiosRequestHeaders>((headers, header) => {
      const value = typeof header === 'function' ? header(this.apiConfig) : header

      return {
        ...headers,
        ...value,
      }
    }, {})
  }

  protected combinePath(route: string | undefined): string {
    const repeatingSlashes = /(\/+)/g

    return [this.routePrefix, route]
      .filter(isDefined)
      .join('/')
      .replace(repeatingSlashes, '/')
  }

  protected instance(): AxiosInstance {
    const config: AxiosRequestConfig = {
      baseURL: this.composeBaseUrl(),
      headers: this.composeHeaders(),
    }

    return axios.create(config)
  }

  protected get<T, R = AxiosResponse<T>>(route?: string, config?: AxiosRequestConfig): Promise<R> {
    const path = this.combinePath(route)

    return this.instance().get(path, config)
  }

  protected delete<T, R = AxiosResponse<T>>(route?: string, config?: AxiosRequestConfig): Promise<R> {
    const path = this.combinePath(route)

    return this.instance().delete(path, config)
  }

  protected head<T, R = AxiosResponse<T>>(route?: string, config?: AxiosRequestConfig): Promise<R> {
    const path = this.combinePath(route)

    return this.instance().head(path, config)
  }

  protected options<T, R = AxiosResponse<T>>(route?: string, config?: AxiosRequestConfig): Promise<R> {
    const path = this.combinePath(route)

    return this.instance().options(path, config)
  }

  // axios uses any for the data argument
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected post<T, R = AxiosResponse<T>>(route?: string, data?: any, config?: AxiosRequestConfig): Promise<R> {
    const path = this.combinePath(route)

    return this.instance().post(path, data, config)
  }

  // axios uses any for the data argument
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected put<T, R = AxiosResponse<T>>(route?: string, data?: any, config?: AxiosRequestConfig): Promise<R> {
    const path = this.combinePath(route)

    return this.instance().put(path, data, config)
  }

  // axios uses any for the data argument
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected patch<T, R = AxiosResponse<T>>(route?: string, data?: any, config?: AxiosRequestConfig): Promise<R> {
    const path = this.combinePath(route)

    return this.instance().patch(path, data, config)
  }
}