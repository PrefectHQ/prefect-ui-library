export const schemaInputTypes = ['form', 'json', null] as const
export type SchemaInputType = typeof schemaInputTypes[number]

export function isSchemaInputType(value: unknown): value is SchemaInputType {
  return schemaInputTypes.includes(value as SchemaInputType)
}