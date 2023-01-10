import { inject, InjectionKey } from 'vue'
import * as components from '@/components'

type Components = typeof components

export const componentsKey: InjectionKey<Partial<Components>> = Symbol()

export function useComponent(): Components {
  const injected = inject(componentsKey, {})

  return { ...components, ...injected }
}