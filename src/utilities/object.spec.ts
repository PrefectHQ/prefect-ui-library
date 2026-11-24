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
})
