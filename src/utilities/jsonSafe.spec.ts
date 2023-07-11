import { describe, expect, it } from 'vitest'
import { jsonSafeParse } from '@/utilities/jsonSafeParse'
import { jsonSafeStringify } from '@/utilities/jsonSafeStringify'

// these values should be reversible.
// parsing the first value should return the second
// stringifying the second value should return the first
const valid = [
  ['true', true],
  ['1', 1],
  ['"foo"', 'foo'],
  ['{}', {}],
  ['{"foo":"bar"}', { foo: 'bar' }],
  ['null', null],
  ['[1,2,3]', [1, 2, 3]],
  ['["foo","bar"]', ['foo', 'bar']],
  ['"\\""', '"'],
] as const

const invalid = [
  '"foo',
  '{ "foo": ',
]

describe('jsonSafeParse', () => {

  it.each(valid)('"%s" returns %s', (input, output) => {
    const parsed = jsonSafeParse(input)

    expect(parsed.value).toEqual(output)
    expect(parsed.success).toBe(true)
  })

  it.each(invalid)('"%s" is invalid', (input) => {
    const parsed = jsonSafeParse(input)

    expect(parsed.value).toEqual(input)
    expect(parsed.success).toBe(false)
  })

})

describe('jsonSafeStringify', () => {

  it.each(valid)('"%s" returns %s', (output, input) => {
    const stringified = jsonSafeStringify(input)

    expect(stringified.value).toEqual(output)
    expect(stringified.success).toBe(true)
  })

  it.fails.each(invalid)('"%s" is invalid', (input) => {
    const stringified = jsonSafeStringify(input)

    expect(stringified.value).toEqual(input)
    expect(stringified.success).toBe(false)
  })

})