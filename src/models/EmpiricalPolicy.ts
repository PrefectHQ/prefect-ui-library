export interface IEmpiricalPolicy {
  retries: number | null,
  retryDelay: number | null,
}

export class EmpiricalPolicy implements IEmpiricalPolicy {
  public retries: number | null
  public retryDelay: number | null

  public constructor(empiricalPolicy: IEmpiricalPolicy) {
    this.retries = empiricalPolicy.retries
    this.retryDelay = empiricalPolicy.retryDelay
  }
}