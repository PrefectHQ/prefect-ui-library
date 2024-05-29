export type VariableV2CreateRequest = Partial<{
  name: string | null,
  value: unknown,
  tags: string[] | null,
}>

export type VariableV2EditRequest = Partial<{
  name: string | null,
  value: unknown,
  tags: string[] | null,
}>