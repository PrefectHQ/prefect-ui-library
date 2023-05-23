import { describe, expect } from 'vitest'
import { MAX_SCHEMA_PROPERTY_LEVEL } from '@/services/schemas/constants'


describe('constants', () => {
  expect(MAX_SCHEMA_PROPERTY_LEVEL).toBe(2)
})