import { BlockDocumentResponseReferenceData } from '@/models/api/BlockDocumentResponse'
import { BlockDocumentReferenceData } from '@/models/BlockDocument'
import { BlockSchemaProperty, BlockSchemaReferenceProperty, BlockSchemaSimpleProperty } from '@/models/BlockSchema'

export function isBlockSchemaReferenceProperty(property: BlockSchemaProperty): property is BlockSchemaReferenceProperty {
  return '$ref' in property
}

export function isBlockSchemaSimpleProperty(property: BlockSchemaProperty): property is BlockSchemaSimpleProperty {
  return !isBlockSchemaReferenceProperty(property)
}

export function isBlockDocumentDataReference(data: unknown): data is BlockDocumentReferenceData {
  return typeof data === 'object' && data !== null && '$ref' in data
}

export function isBlockDocumentResponseDataReference(data: unknown): data is BlockDocumentResponseReferenceData {
  return typeof data === 'object' && data !== null && '$ref' in data
}