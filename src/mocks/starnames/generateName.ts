import { names, prefixes, suffixes } from '.'
import { choice, weightedNumber, coinflip } from '@/mocks/math'


const generateName = (): string => {
  const prefix = choice(prefixes).replace('RANDOM', weightedNumber().toString())
  const name = choice(names)
  const suffix = coinflip(0.6) ? choice(suffixes) : ''

  return [prefix, name, suffix].join('-').replace(/-+$/, '')
}

export { generateName }