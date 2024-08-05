import { asArray } from '@prefecthq/prefect-design'
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, RawAxiosRequestHeaders } from 'axios'
import { MaybeGetter } from '@/types'
import { MaybeArray } from '@/types/utilities'
import { isDefined } from '@/utilities/variables'

export type AxiosInstanceSetupHook = (instance: AxiosInstance) => void

export type PrefectConfig = {
  baseUrl: string,
  token?: string,
}

type ConfigFunction<R, T extends PrefectConfig = PrefectConfig> = (config: T) => R
export type ApiBaseUrl<T extends PrefectConfig = PrefectConfig> = string | ConfigFunction<string, T>
export type ApiHeaders<T extends PrefectConfig = PrefectConfig> = RawAxiosRequestHeaders | ConfigFunction<RawAxiosRequestHeaders, T>

export const getPrefectBaseUrl: ApiBaseUrl = (config) => config.baseUrl

export const getPrefectUIHeaders: RawAxiosRequestHeaders = { 'X-PREFECT-UI': true }

export const getAuthorizationHeaders: ApiHeaders = (config) => {
  const value: RawAxiosRequestHeaders = {}

  if (config.token) {
    value.Authorization = `bearer ${config.token}`
  }

  return value
}

export class Api<T extends PrefectConfig = PrefectConfig> {
  protected readonly apiConfig: MaybeGetter<T>
  protected apiHeaders: MaybeArray<ApiHeaders> = [getPrefectUIHeaders, getAuthorizationHeaders]
  protected apiBaseUrl: ApiBaseUrl = getPrefectBaseUrl
  protected routePrefix: string | undefined
  protected instanceSetupHook: AxiosInstanceSetupHook | null

  public constructor(apiConfig: MaybeGetter<T>, instanceSetupHook: AxiosInstanceSetupHook | null = null) {
    this.apiConfig = apiConfig
    this.instanceSetupHook = instanceSetupHook
  }

  protected getConfig(): T {
    if (typeof this.apiConfig === 'function') {
      return this.apiConfig()
    }

    return this.apiConfig
  }

  protected composeBaseUrl(): string {
    if (typeof this.apiBaseUrl === 'string') {
      return this.apiBaseUrl
    }

    return this.apiBaseUrl(this.getConfig())
  }

  protected composeHeaders(): RawAxiosRequestHeaders {
    const array = asArray(this.apiHeaders)

    return array.reduce<RawAxiosRequestHeaders>((headers, header) => {
      const value = typeof header === 'function' ? header(this.getConfig()) : header

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

    const instance = axios.create(config)
    if (this.instanceSetupHook) {
      this.instanceSetupHook(instance)
    }

    return instance
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