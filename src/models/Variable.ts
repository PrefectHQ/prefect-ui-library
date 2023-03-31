
export interface IVariable {
  id: string,
  created: Date,
  updated: Date,
  name: string,
  value: string,
  tags: string[],
}

export class Variable implements IVariable {
  public readonly id: string
  public readonly created: Date
  public readonly updated: Date
  public name: string
  public value: string
  public tags: string[]

  public constructor(
    variable: IVariable,
  ) {
    this.id = variable.id
    this.name = variable.name
    this.value = variable.value
    this.tags = variable.tags
    this.created = variable.created
    this.updated = variable.updated
  }
}