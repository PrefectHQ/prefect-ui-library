export interface IVariable {
  id: string,
  created: Date,
  updated: Date,
  name: string,
  value: unknown,
  tags: string[],
}

export const MAX_VARIABLE_NAME_LENGTH = 255 as const
export const MAX_VARIABLE_VALUE_LENGTH = 5000 as const

export class Variable implements IVariable {
  public readonly id: string
  public readonly kind = 'variable'
  public readonly created: Date
  public readonly updated: Date
  public name: string
  public value: unknown
  public tags: string[]

  public get valueString(): string {
    return JSON.stringify(this.value)
  }

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