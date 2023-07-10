import { describe, expect, it } from 'vitest'
import { stringifyUnknownJson } from '@/utilities/stringifyUnknownJson'

describe('json', () => {

  it('stringifyUnknownJson', () => {
    // valid json
    expect(stringifyUnknownJson(true)).toBe('true')
    expect(stringifyUnknownJson(1)).toBe('1')
    expect(stringifyUnknownJson('1')).toBe('1')
    expect(stringifyUnknownJson('foo')).toBe('foo')
    expect(stringifyUnknownJson({ foo: 'bar' })).toBe('{"foo":"bar"}')
    expect(stringifyUnknownJson('{}')).toBe('{}')
    expect(stringifyUnknownJson(null)).toBe('null')
    expect(stringifyUnknownJson('null')).toBe('null')
    expect(stringifyUnknownJson([1, 2, 3])).toBe('[1,2,3]')
    expect(stringifyUnknownJson(['foo', 'bar'])).toBe('["foo","bar"]')

    const date = new Date()
    expect(stringifyUnknownJson(date)).toBe(`"${date.toISOString()}"`)

    // invalid json
    expect(stringifyUnknownJson('"foo')).toBe('"foo')
    expect(stringifyUnknownJson('{ "foo": ')).toBe('{ "foo": ')
  })

})