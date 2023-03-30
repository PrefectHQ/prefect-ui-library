
export interface IVariable {
  id: string,
  key: string,
  value: string,
  tags: string[],
}

export class Variable implements IVariable {
  public readonly id: string
  public key: string
  public value: string
  public tags: string[]

  public constructor(
    variable: IVariable,
  ) {
    this.id = variable.id
    this.key = variable.key
    this.value = variable.value
    this.tags = variable.tags
  }
}