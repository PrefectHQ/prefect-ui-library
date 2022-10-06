/* eslint-disable no-redeclare */
import { ref, Ref, watchEffect } from 'vue'
import { session } from '@/services/storage'

type UseSessionStorage<T> = {
  value: Ref<T>,
  initialValue: T,
  remove: () => void,
  set: (value: NonNullable<T>) => void,
}

export function useSessionStorage<T>(key: string): UseSessionStorage<T | null>
export function useSessionStorage<T>(key: string, defaultValue: T): UseSessionStorage<T>
export function useSessionStorage<T>(key: string, defaultValue: T | null = null): UseSessionStorage<T | null> {
  const initialValue = session.get(key, defaultValue)
  const data = ref(initialValue) as Ref<T | null>

  const remove = (): void => {
    session.remove(key)
    data.value = null
  }

  const set = (value: T): void => {
    data.value = value
  }

  watchEffect(() => {
    if (data.value !== null) {
      session.set(key, data.value)
    }
  })

  return {
    value: data,
    initialValue,
    remove,
    set,
  }
}