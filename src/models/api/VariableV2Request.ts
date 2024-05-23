export type VariableV2CreateRequest = Partial<{
  name: string | null,
  value: unknown,
  tags: string[] | null,
}>

export type VariableEditRequest = Partial<{
  name: string | null,
  value: unknown,
  tags: string[] | null,
}>