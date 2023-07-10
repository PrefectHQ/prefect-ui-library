import { describe, expect, it } from 'vitest'
import { stringifyUnknownJson } from '@/utilities/stringifyUnknownJson'

describe('json', () => {

  it('stringifyUnknownJson', () => {
    // valid json
    expect(stringifyUnknownJson(true)).toBe('true')
    expect(stringifyUnknownJson(1)).toBe('1')
    expect(stringifyUnknownJson('foo')).toBe('"foo"')
    expect(stringifyUnknownJson({ foo: 'bar' })).toBe('{"foo":"bar"}')
    expect(stringifyUnknownJson('{}')).toBe('{}')

    // invalid json
    // eslint-disable-next-line quotes
    expect(stringifyUnknownJson('"foo')).toBe('"\\"foo"')
  })

})