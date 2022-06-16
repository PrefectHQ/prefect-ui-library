export function hasProperty<T extends Record<string | symbol, unknown>>(needle: T, property: unknown): property is keyof T {
  return (typeof property === 'string' || typeof property === 'symbol') && property in needle
}