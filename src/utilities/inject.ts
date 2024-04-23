import { inject as vueInject, InjectionKey, ComponentInternalInstance, getCurrentInstance } from 'vue'

export function inject<T>(key: InjectionKey<T> | string): T {
  const value = vueInject(key)

  if (value === undefined) {
    throw `Failed to inject value with key ${String(key)}`
  }

  return value
}

type ComponentInstanceWithProvide = ComponentInternalInstance & { provides: Record<symbol, unknown> } | null

export function injectFromSelfOrAncestor<T>(key: InjectionKey<T>): T | undefined {
  const vm = getCurrentInstance() as ComponentInstanceWithProvide
  const symbol = getSymbolForInjectionKey(key)
  const value = vm?.provides[symbol]

  if (value !== undefined) {
    return value as T
  }

  return inject(key)
}

export function getSymbolForInjectionKey(key: InjectionKey<unknown>): symbol {
  return key as symbol
}