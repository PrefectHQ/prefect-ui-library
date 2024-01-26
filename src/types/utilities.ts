export type KeysMatching<T, V> = {
  [K in keyof T]-?: T[K] extends V ? K : never
}[keyof T]

export type Require<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>

export type AnyCase<T extends string> =
  string extends T
    ? string
    : T extends `${infer F1}${infer F2}${infer R}`
      ? (`${Uppercase<F1> | Lowercase<F1>}${Uppercase<F2> | Lowercase<F2>}${AnyCase<R>}`)
      : T extends `${infer F}${infer R}`
        ? `${Uppercase<F> | Lowercase<F>}${AnyCase<R>}`
        : ''


// This is a bit of a hacky type because
// TS < 4.8 doesn't support ranges well
// but it saves a bunch of boilerplate :)
export type NumberRange<
  N extends number,
  M extends number,
  Result extends unknown[] = [N]
> =
  (Result['length'] extends M
    ? [...Result, M]
    : NumberRange<N, M, [...Result, Result['length']]>
  )

export type MaybeArray<T> = T | T[]

// Converts types like { A: boolean } & { B: number } & { C: string } into a { A: boolean, B: number, C: string}
// this type is somewhat magical and don't wanna mess with the {}
// eslint-disable-next-line @typescript-eslint/ban-types
export type Simplify<T> = { [K in keyof T]: T[K] } & {}