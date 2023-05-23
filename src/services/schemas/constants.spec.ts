import { describe, expect, it } from 'vitest'
import { MAX_SCHEMA_PROPERTY_LEVEL } from '@/services/schemas/constants'


describe('constants', () => {
  it('exports MAX_SCHEMA_PROPERTY_LEVEL', () => {
    expect(MAX_SCHEMA_PROPERTY_LEVEL).toBe(2)
  })
})