import { describe, expect, it } from 'vitest'
import { getSchemaPropertyDefaultValue } from '@/schemas/utilities/getSchemaPropertyDefaultValue'

describe('getSchemaPropertyDefaultValue', () => {
  it('uses a const value instead of a conflicting default', () => {
    expect(getSchemaPropertyDefaultValue({
      type: 'string',
      const: 'bar',
      default: null,
    })).toBe('bar')
  })

  it('uses the property default when there is no const', () => {
    expect(getSchemaPropertyDefaultValue({ default: 'value' })).toBe('value')
  })

  it('collects defaults from object properties', () => {
    expect(getSchemaPropertyDefaultValue({
      type: 'object',
      properties: {
        foo: { default: 'bar' },
        baz: { type: 'string' },
      },
    })).toEqual({ foo: 'bar' })
  })
})
