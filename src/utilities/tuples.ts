export type TupleType<T extends string[]> = {
  tuple: T,
  isTuple: (value: unknown) => value is T,
}

export function createTupleType<const T extends string[]>(tuple: T): TupleType<T> {

  function isTuple(value: unknown): value is T {
    return tuple.includes(value as T[number])
  }

  return {
    tuple,
    isTuple,
  }
}