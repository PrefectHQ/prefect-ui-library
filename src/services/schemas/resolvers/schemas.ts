import { schemaBlockReferenceDefaultValuesResolver } from '@/services/schemas/resolvers/blockReferenceDefaults'
import { schemaDefinitionsResolver } from '@/services/schemas/resolvers/definitions'
import { schemaMetaResolver } from '@/services/schemas/resolvers/meta'
import { resolve, ResolverCallback } from '@/services/schemas/utilities'
import { Schema } from '@/types/schemas'

export type SchemaResolver = ResolverCallback<Schema>

/*
 * Resolvers that need to be run on a Schema before it can consumed by the UI. ORDER IS IMPORTANT
 */
const resolvers = [schemaDefinitionsResolver, schemaBlockReferenceDefaultValuesResolver, schemaMetaResolver]

/*
 * Run all resolvers that need to be run on a Schema before it can be consumed by the UI
 */
export const resolveSchema: SchemaResolver = (schema: Schema): Schema => {
  return resolve(schema, resolvers)
}