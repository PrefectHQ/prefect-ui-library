import { Storage, Unsubscribe } from '@/services/storage/Storage'
import { StorageItem } from '@/services/storage/StorageItem'
import { tryOnScopeDispose } from '@/utilities/tryOnScopeDispose'

export type UseStorage<T extends StorageItem> = {
  add: (value: T) => void,
  addAll: (value: T[]) => void,
  remove: (id: string) => void,
  removeAll: (ids: string[]) => void,
  get: (id: string) => T | undefined,
  getAll: (ids: string[]) => T[],
}

export function useStorage<T extends StorageItem>(storage: Storage<T>): () => UseStorage<T> {
  return () => {

    let getUnsubscribe: Unsubscribe | undefined = undefined
    let getAllUnsubscribe: Unsubscribe | undefined = undefined

    tryOnScopeDispose(() => {
      getUnsubscribe?.()
      getAllUnsubscribe?.()
    })

    const get = (id: string): T | undefined => {
      const unsubscribe = getUnsubscribe

      getUnsubscribe = storage.subscribe(id)
      unsubscribe?.()

      return storage.get(id)
    }

    const getAll = (ids: string[]): T[] => {
      const unsubscribe = getAllUnsubscribe
      const unsubscribes = ids.map<Unsubscribe>(id => storage.subscribe(id))

      getAllUnsubscribe = () => unsubscribes.forEach(unsubscribe => unsubscribe())
      unsubscribe?.()

      return storage.getAll(ids)
    }

    return {
      add: (value: T) => storage.add(value),
      addAll: (values: T[]) => storage.addAll(values),
      remove: (id: string) => storage.remove(id),
      removeAll: (ids: string[]) => storage.removeAll(ids),
      get,
      getAll,
    }
  }
}