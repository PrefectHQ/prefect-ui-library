import { stringifyUnknownJson } from '@/utilities'

export interface IVariableV2 {
  id: string,
  created: Date,
  updated: Date,
  name: string,
  value: unknown,
  tags: string[],
}

export class VariableV2 implements IVariableV2 {
  public readonly id: string
  public readonly created: Date
  public readonly updated: Date
  public name: string
  public value: unknown
  public tags: string[]

  public get valueString(): string {
    return stringifyUnknownJson(this.value) ?? ''
  }

  public constructor(
    variable: IVariableV2,
  ) {
    this.id = variable.id
    this.name = variable.name
    this.value = variable.value
    this.tags = variable.tags
    this.created = variable.created
    this.updated = variable.updated
  }
}