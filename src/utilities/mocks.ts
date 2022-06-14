import { hasProperty } from '@/mocks/objects'

type MockedObject<T extends object> = Record<keyof T, T[keyof T]>

export function mockClass<T extends object>(constructor: new () => T, mocked: MockedObject<T>): T {
  return new Proxy(new constructor(), {
    get: (target, prop) => {
      if (hasProperty(mocked, prop)) {
        return mocked[prop]
      }
    },
  })
}