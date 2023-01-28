import { choice, range } from '@/utilities/arrays'

export const { random, floor, ceil } = Math

const uniform = (min: number, max: number): number => floor(random() * (max - min + 1) + min)

const coinflip = (weight: number): boolean => uniform(0, 1) < weight

const weightedNumber = (): number => {
  const seed = uniform(1, 3)

  if (seed == 1) {
    return choice(range(10, 100))
  }

  return choice(range(101, 1000))
}

export function countDigits(value: number): number {
  return `${value}`.length
}

export {
  uniform,
  coinflip,
  weightedNumber
}