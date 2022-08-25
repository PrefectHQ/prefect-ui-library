import { inject as vueInject, InjectionKey } from 'vue'

export function inject<T>(key: InjectionKey<T> | string, defaultValue?: T): T {
  const value = vueInject(key, defaultValue)

  if (value === undefined) {
    throw `Failed to inject value with key ${String(key)}`
  }

  return value
}