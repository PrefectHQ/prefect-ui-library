import { hasProperty } from '@/mocks/objects'

export function mockClass<T extends object>(source: new () => T, mocked: Partial<Record<keyof T, T[keyof T]>>): T {
  return new Proxy(new source(), {
    get: (target, prop, receiver) => {
      if (hasProperty(mocked, prop)) {
        return mocked[prop]
      }

      return Reflect.get(target, prop, receiver)
    },
  })
}