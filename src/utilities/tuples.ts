export type TupleType<T extends unknown[]> = {
  tuple: Readonly<T>,
  isTuple: (value: unknown) => value is T[number],
}

export function createTuple<const T extends unknown[]>(tuple: T): TupleType<T> {
  const values = new Set(tuple)

  function isTuple(value: unknown): value is T[number] {
    return values.has(value)
  }

  return {
    tuple,
    isTuple,
  }
}