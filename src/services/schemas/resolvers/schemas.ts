import { resolve, ResolverCallback } from '../utilities'
import { schemaDefinitionsResolver } from './definitions'
import { schemaMetaResolver } from './meta'
import { Schema } from '@/types/schemas'

export type SchemaResolver = ResolverCallback<Schema>

/*
 * Resolvers that need to be run on a Schema before it can consumed by the UI. ORDER IS IMPORTANT
 */
const resolvers = [schemaDefinitionsResolver, schemaMetaResolver]

/*
 * Run all resolvers that need to be run on a Schema before it can be consumed by the UI
 */
export const resolveSchema: SchemaResolver = (schema: Schema): Schema => {
  return resolve(schema, resolvers)
}