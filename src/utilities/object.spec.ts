import { afterEach, describe, expect, it } from 'vitest'
import { merge } from '@/utilities/object'

const pollutingSources = [
  '{"__proto__": {"polluted": true}}',
  '{"constructor": {"prototype": {"polluted": true}}}',
  '{"nested": {"__proto__": {"polluted": true}}}',
]

describe('merge', () => {
  afterEach(() => {
    delete (Object.prototype as Record<string, unknown>).polluted
  })

  it.each(pollutingSources)('does not pollute Object.prototype from %s', (json) => {
    merge<Record<string, unknown>>({ nested: {} }, JSON.parse(json))

    expect(({} as Record<string, unknown>).polluted).toBeUndefined()
  })

  it.each([
    ['{"constructor": "value"}', { constructor: 'value' }],
    ['{"prototype": "value"}', { prototype: 'value' }],
    ['{"constructor": {"name": "x"}}', { constructor: { name: 'x' } }],
    ['{"prototype": {"name": "x"}}', { prototype: { name: 'x' } }],
    ['{"nested": {"constructor": {"first": 1}, "prototype": {"second": 2}}}', { nested: { constructor: { first: 1 }, prototype: { second: 2 } } }],
  ])('copies %s as own properties', (json, expected) => {
    const result = merge<Record<string, unknown>>({ nested: {} }, JSON.parse(json))

    expect(result).toMatchObject(expected)
    expect(Object.keys(result)).toEqual(expect.arrayContaining(Object.keys(expected)))
    expect(({} as Record<string, unknown>).first).toBeUndefined()
    expect(({} as Record<string, unknown>).second).toBeUndefined()
    expect(({} as Record<string, unknown>).name).toBeUndefined()
  })

  it.each([
    ['constructor'],
    ['toString'],
    ['hasOwnProperty'],
  ])('treats %s like any other key the source omits', (key) => {
    const result = merge<Record<string, unknown>>({ [key]: 'value' }, {})

    expect(Object.prototype.hasOwnProperty.call(result, key)).toBe(true)
    expect(result[key]).toBeUndefined()
  })
})
