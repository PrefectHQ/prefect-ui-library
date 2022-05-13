import { names, prefixes, suffixes } from '.'

// Random number generator
const uniform = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1) + min)


// Random element selector equivalent to python's choice method
const choice = <T = unknown>(list: T[]): T => list[Math.floor(Math.random() * list.length)]
const coinflip = (weight: number): boolean => uniform(0, 1) < weight
const range = (min: number, max: number): number[] => Array.from({ length: max - min }, (x, i) => min + i)

const weightedNumber = (): number => {
  const seed = uniform(1, 3)

  if (seed == 1) {
    return choice(range(10, 100))
  }

  return choice(range(101, 1000))
}

const generateName = (): string => {
  const prefix = choice(prefixes).replace('RANDOM', weightedNumber().toString())
  const name = choice(names)
  const suffix = coinflip(0.6) ? choice(suffixes) : ''

  return [prefix, name, suffix].join('-').replace(/-+$/, '')
}

export { generateName }