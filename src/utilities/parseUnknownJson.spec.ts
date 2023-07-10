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

    // invalid json
    expect(parseUnknownJson('"foo')).toBe('"foo')
  })

})