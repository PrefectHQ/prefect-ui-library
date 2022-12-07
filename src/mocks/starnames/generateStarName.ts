import { names, prefixes, suffixes } from '.'
import { choice } from '@/utilities/arrays'
import { weightedNumber, coinflip } from '@/utilities/math'


const generateStarName = (): string => {
  const prefix = choice(prefixes).replace('RANDOM', weightedNumber().toString())
  const name = choice(names)
  const suffix = coinflip(0.6) ? choice(suffixes) : ''

  return [prefix, name, suffix].join('-').replace(/-+$/, '')
}

export { generateStarName }