import { hasProperty } from '@/mocks/objects'

export function mockClass<T extends object>(source: new () => T, mocked: Partial<Record<keyof T, T[keyof T]>>): T {
  return new Proxy(new source(), {
    get: (target, prop) => {
      if (hasProperty(mocked, prop)) {
        return Reflect.get(mocked, prop).bind(target)
      }

      return Reflect.get(target, prop).bind(target)
    },
  })
}