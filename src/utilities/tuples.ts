export type TupleType<T extends unknown[]> = {
  values: Readonly<T>,
  isValue: (value: unknown) => value is T[number],
}

/**
 * Creates a tuple with the provided values.
 *
 * @template T - The type of the elements in the tuple.
 * @param {T} values - The values to be included in the tuple.
 * @returns {TupleType<T>} An object representing the tuple, with a `values` property containing the tuple values and an `isValue` method to check if a value is part of the tuple.
 */
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