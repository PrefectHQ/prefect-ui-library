import axios, { AxiosInstance, AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from 'axios'

export type PrefectConfig = {
  baseUrl: string,
  token?: string,
}

export type GetApiBaseUrl<T extends PrefectConfig = PrefectConfig> = (config: T) => string
export type GetApiHeaders<T extends Partial<PrefectConfig> = Partial<PrefectConfig>> = (config: T) => AxiosRequestHeaders

export const getPrefectBaseUrl: GetApiBaseUrl = (config) => {
  return config.baseUrl
}

export const getPrefectUIHeaders: GetApiHeaders = () => {
  return {
    'X-PREFECT-UI': true,
  }
}

export const getAuthorizationHeaders: GetApiHeaders = (config) => {
  const value: AxiosRequestHeaders = {}

  if (config.token) {
    value.Authorization = `bearer ${config.token}`
  }

  return value
}

export class BaseApi<T extends PrefectConfig = PrefectConfig> {
  protected readonly apiConfig: T
  protected routePrefix: string | undefined
  protected getHeaders: GetApiHeaders[]
  protected getBaseUrl: GetApiBaseUrl

  public constructor(apiConfig: T) {
    this.apiConfig = apiConfig

    this.getHeaders = [getPrefectUIHeaders, getAuthorizationHeaders]
    this.getBaseUrl = getPrefectBaseUrl
  }

  protected get baseUrl(): string {
    return this.getBaseUrl(this.apiConfig)
  }

  protected removeUndefinedPaths(input: string | undefined): input is string {
    return !!input
  }

  protected removeLeadingAndTrailingSlashes(input: string): string {
    return input.replace(/^(\/)|(\/)$/g, '')
  }

  protected combinePath(route: string | undefined): string {
    return [this.routePrefix, route]
      .filter(this.removeUndefinedPaths)
      .map(this.removeLeadingAndTrailingSlashes)
      .join('/')
  }

  protected get headers(): AxiosRequestHeaders {
    return this.getHeaders.reduce((headers, getHeaders) => {
      return {
        ...headers,
        ...getHeaders(this.apiConfig),
      }
    }, {})
  }

  protected instance(): AxiosInstance {
    const config: AxiosRequestConfig = {
      baseURL: this.baseUrl,
      headers: this.headers,
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