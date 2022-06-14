import { hasProperty } from '@/mocks/objects'

export function mockClass<T extends object>(constructor: new () => T, mocked: Record<keyof T, T[keyof T]>): T {
  return new Proxy(new constructor(), {
    get: (target, prop) => {
      if (hasProperty(mocked, prop)) {
        return mocked[prop]
      }
    },
  })
}