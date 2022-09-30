/* eslint-disable no-redeclare */
import { ref, Ref, watchEffect } from 'vue'
import { local } from '@/services/storage'

type UseSessionStorage<T> = {
  value: Ref<T>,
  remove: () => void,
}

export function useSessionStorage<T>(key: string): UseSessionStorage<T | null>
export function useSessionStorage<T>(key: string, defaultValue: T): UseSessionStorage<T>
export function useSessionStorage<T>(key: string, defaultValue: T | null = null): UseSessionStorage<T | null> {
  const value = ref(local.get(key, defaultValue)) as Ref<T | null>
  const remove = (): void => local.remove(key)

  watchEffect(() => {
    console.log({ value })
    local.set(key, value)
  })

  return {
    value,
    remove,
  }
}