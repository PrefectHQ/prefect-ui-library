export interface IEmpiricalPolicy {
  retries: number | null,
  retryDelay: number | null,
  retryJitterFactor: number | null,
  /**
   * @deprecated
   * Use `retries` instead
   */
  maxRetries: number | null,
  /**
   * @deprecated
   * Use `retryDelay` instead
   */
  retryDelaySeconds: number | null,
}

export class EmpiricalPolicy implements IEmpiricalPolicy {
  public retries: number | null
  public retryDelay: number | null
  public retryJitterFactor: number | null
  public maxRetries: number | null
  public retryDelaySeconds: number | null

  public constructor(empiricalPolicy: IEmpiricalPolicy) {
    this.retries = empiricalPolicy.retries
    this.retryDelay = empiricalPolicy.retryDelay
    this.retryJitterFactor = empiricalPolicy.retryJitterFactor
    this.maxRetries = empiricalPolicy.maxRetries
    this.retryDelaySeconds = empiricalPolicy.retryDelaySeconds
  }
}