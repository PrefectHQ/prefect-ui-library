import { describe, expect, it } from 'vitest'
import { parseUnknownJson } from '@/utilities/parseUnknownJson'

describe('json', () => {

  it('parseUnknownJson', () => {
    // valid json
    expect(parseUnknownJson('true')).toBe(true)
    expect(parseUnknownJson('1')).toBe(1)
    expect(parseUnknownJson('"foo"')).toBe('"foo"')
    expect(parseUnknownJson('{"foo":"bar"}')).toMatchObject({ foo: 'bar' })
    expect(parseUnknownJson('{}')).toMatchObject({})
    expect(parseUnknownJson('null')).toBe(null)
    expect(parseUnknownJson('[1,2,3]')).toMatchObject([1, 2, 3])
    expect(parseUnknownJson('["foo","bar"]')).toMatchObject(['foo', 'bar'])

    // JSON.parse does not parse ISO dates back to date objects
    const date = new Date()
    expect(parseUnknownJson(`"${date.toISOString()}"`)).toBe(`"${date.toISOString()}"`)

    // invalid json
    expect(parseUnknownJson('"foo')).toBe('"foo')
    expect(parseUnknownJson('{ "foo": ')).toBe('{ "foo": ')
  })

})