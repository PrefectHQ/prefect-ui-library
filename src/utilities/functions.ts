// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isFunction(value: unknown): value is (...args: any[]) => unknown {
  return typeof value === 'function'
}