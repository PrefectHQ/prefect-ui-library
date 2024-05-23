export type VariableCreateRequest = Partial<{
  name: string | null,
  value: unknown,
  tags: string[] | null,
}>

export type VariableEditRequest = Partial<{
  name: string | null,
  value: unknown,
  tags: string[] | null,
}>