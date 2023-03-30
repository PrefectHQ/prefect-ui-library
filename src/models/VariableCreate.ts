export type VariableCreate = {
  name: string,
} & Partial<{
  value: string | null,
  tags: string[] | null,
}>