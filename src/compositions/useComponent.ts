import { inject, InjectionKey } from 'vue'
import FlowMenu from '@/components/FlowMenu.vue'
import WorkQueueMenu from '@/components/WorkQueueMenu.vue'

const components = {
  FlowMenu,
  WorkQueueMenu,
} as const

type Components = typeof components

export const componentsKey: InjectionKey<Partial<Components>> = Symbol()

export function useComponent<T extends keyof Components>(name: T): Components[T] {
  const injected = inject(componentsKey, {})

  return injected[name] ?? components[name]
}