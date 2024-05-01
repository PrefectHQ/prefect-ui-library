import { inject as vueInject, InjectionKey, ComponentInternalInstance, getCurrentInstance } from 'vue'

export function inject<T>(key: InjectionKey<T> | string): T {
  const value = vueInject(key)

  if (value === undefined) {
    throw `Failed to inject value with key ${String(key)}`
  }

  return value
}

type ComponentInstanceWithProvide = ComponentInternalInstance & { provides: Record<string | symbol, unknown> } | null

export function injectFromSelfOrAncestor<T>(key: InjectionKey<T>): T | undefined {
  const vm = getCurrentInstance() as ComponentInstanceWithProvide
  const value = vm?.provides[key as symbol]

  if (value !== undefined) {
    return value as T
  }

  return vueInject(key, undefined)
}

