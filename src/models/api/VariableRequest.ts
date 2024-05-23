export type VariableCreateRequest = Partial<{
  name: string | null,
  value: string | null,
  tags: string[] | null,
}>

export type VariableEditRequest = Partial<{
  name: string | null,
  value: string | null,
  tags: string[] | null,
}>