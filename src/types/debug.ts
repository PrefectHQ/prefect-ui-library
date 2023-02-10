// expand types from https://stackoverflow.com/a/57683652/2687861
export type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never

export type ExpandRecursively<T> = T extends object
  ? T extends infer O ? { [K in keyof O]: ExpandRecursively<O[K]> } : never
  : T
