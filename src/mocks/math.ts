export const { random, floor, ceil } = Math

// Random number generator
const uniform = (min: number, max: number): number => floor(random() * (max - min + 1) + min)

// Random element selector equivalent to python's choice method
const choice = <T = unknown>(list: T[]): T => list[floor(random() * list.length)]

const coinflip = (weight: number): boolean => uniform(0, 1) < weight

const range = (min: number, max: number): number[] => Array.from({ length: max - min }, (x, i) => min + i)

const weightedNumber = (): number => {
  const seed = uniform(1, 3)

  if (seed == 1) {
    return choice(range(10, 100))
  }

  return choice(range(101, 1000))
}


export {
  uniform,
  choice,
  range,
  coinflip,
  weightedNumber
}