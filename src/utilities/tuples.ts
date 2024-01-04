export type TupleType<T extends string[]> = {
  tuple: Readonly<T>,
  isTuple: (value: unknown) => value is T[number],
}

export function createTuple<const T extends string[]>(tuple: T): TupleType<T> {

  function isTuple(value: unknown): value is T[number] {
    return tuple.includes(value as T[number])
  }

  return {
    tuple,
    isTuple,
  }
}