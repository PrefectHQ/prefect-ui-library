export type TupleType<T extends unknown[]> = {
  values: Readonly<T>,
  isValue: (value: unknown) => value is T[number],
}

export function createTuple<const T extends unknown[]>(values: T): TupleType<T> {
  const tuple = new Set(values)

  function isValue(value: unknown): value is T[number] {
    return tuple.has(value)
  }

  return {
    values,
    isValue,
  }
}