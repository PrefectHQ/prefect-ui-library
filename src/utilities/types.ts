export function asType<T extends() => unknown>(value: unknown, type: T): ReturnType<T> | null {
  if (typeof value === typeof type()) {
    return value as ReturnType<T>
  }

  return null
}