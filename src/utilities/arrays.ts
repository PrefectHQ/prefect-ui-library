import { mocker } from '@/services'
import { floor, random } from '@/utilities/math'

// we really do want any here
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function toRecord<T extends any[], K extends keyof T[number]>(source: T, key: K): Record<K, T> {
  return source.reduce((result, item) => {
    const itemKey = item[key]
    result[itemKey] = item

    return result
  }, {})
}

// Random element selector equivalent to python's choice method
export const choice = <T>(list: T[] | Readonly<T[]>): T => list[floor(random() * list.length)]

export const range = (min: number, max: number): number[] => Array.from({ length: max - min }, (x, i) => min + i)


// we really do want any here
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function unique<T extends any[]>(array: T): T {
  // eslint-disable-next-line id-length
  return array.filter((v, i, a) => a.indexOf(v) === i) as T
}


// we really do want any here
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isNonEmptyArray<T extends any[]>(
  array: T | undefined,
): array is T {
  return array !== undefined && array.length > 0
}


export function asArray<T>(input: T | T[] | null): T[] {
  if (input === null || input === undefined) {
    return []
  }

  if (!Array.isArray(input)) {
    return [input]
  }

  return input
}

// we really do want any here
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isSame(arrayA: any[], arrayB: any[]): boolean {
  if (arrayA.length !== arrayB.length) {
    return false
  }

  const arrayBCopy = [...arrayB]

  return arrayA.every(itemA => arrayBCopy.some((itemB, index) => {
    const match = itemA.toString() === itemB.toString()

    if (match) {
      arrayBCopy.splice(index, 1)
    }

    return match
  }))
}

// we really do want any here
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function lastItemInArray<T extends any[]>(array: T): T[number] {
  return array[array.length - 1]
}

// we really do want any here
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function allButLastArrayItems<T extends any[]>(array: T): T[number][] {
  return array.slice(0, array.length - 1)
}

// shamelessly copied from https://stackoverflow.com/a/2450976/2687861
export function shuffle<T>(array: T[]): T[] {
  let currentIndex = array.length
  let randomIndex = undefined

  while (currentIndex != 0) {

    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
  }

  return array
}

export function isEmptyArray(value: unknown): value is unknown[] {
  return Array.isArray(value) && value.length === 0
}

export function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.length > 0 && value.every(item => typeof item === 'string')
}

export function isNumberArray(value: unknown): value is number[] {
  return Array.isArray(value) && value.length > 0 && value.every(item => typeof item === 'number')
}

export function asSingle<T>(value: T | T[]): T {
  if (Array.isArray(value)) {
    const [first] = value

    return first
  }

  return value
}

export function repeat<T>(count: number, method: () => T): T[] {
  return new Array(count).fill(null).map(method)
}

export function some<T>(source: T[], min?: number, max?: number): T[] {
  const minArg = min ?? 1
  const maxArg = max ?? source.length
  const count = mocker.create('number', [minArg, maxArg])
  const copy = [...source]

  const value = repeat(count, () => {
    const index = mocker.create('number', [0, copy.length - 1])
    const value = copy.splice(index, 1)

    return value[0]
  })

  return value
}

export function intersects(first: unknown[], ...rest: unknown[][]): boolean {
  return first.some(firstValue => rest.every(restArray => restArray.includes(firstValue)))
}

export function groupBy<T, K extends keyof T>(source: T[], key: K): Map<T[K], T[]> {
  return source.reduce((result, value) => {
    const mapKey = value[key]
    const initial = result.get(mapKey) ?? []

    initial.push(value)

    result.set(mapKey, initial)

    return result
  }, new Map<T[K], T[]>())
}

export function separate<T>(source: T[], filter: (value: T) => boolean): [found: T[], notFound: T[]] {
  return source.reduce<[T[], T[]]>(([found, notFound], value) => {
    if (filter(value)) {
      found.push(value)
    } else {
      notFound.push(value)
    }

    return [found, notFound]
  }, [[], []])
}
