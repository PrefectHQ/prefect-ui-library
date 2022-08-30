export interface IEmpiricalPolicy {
  retries: number | null,
  retryDelay: number | null,
  maxRetries: number | null,
  retryDelaySeconds: number | null,
}

export class EmpiricalPolicy implements IEmpiricalPolicy {
  public retries: number | null
  public retryDelay: number | null
  public maxRetries: number | null
  public retryDelaySeconds: number | null

  public constructor(empiricalPolicy: IEmpiricalPolicy) {
    this.retries = empiricalPolicy.retries
    this.retryDelay = empiricalPolicy.retryDelay
    this.maxRetries = empiricalPolicy.maxRetries
    this.retryDelaySeconds = empiricalPolicy.retryDelaySeconds
  }
}