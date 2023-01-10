import { inject, InjectionKey } from 'vue'
import * as components from '@/components'

type Components = typeof components
type ComponentDefinition<T> = { new (...args: unknown[]): { $props: T } }

type ProvidedComponents = {
  [P in keyof Components]?: ComponentDefinition<InstanceType<Components[P]>['$props']>
}

export const componentsKey: InjectionKey<ProvidedComponents> = Symbol()

export function useComponent(): ProvidedComponents {
  const injected = inject(componentsKey, {})

  return { ...components, ...injected }
}