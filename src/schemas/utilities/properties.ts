import { SchemaProperty } from '@/schemas/types/schema'

export function getPropertyPosition(property: SchemaProperty): number {
  const { position = 0 } = property

  return position
}