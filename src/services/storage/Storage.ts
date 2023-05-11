import { isDefined } from '@prefecthq/prefect-design'
import { ComputedRef, Ref, computed, reactive, ref, unref, watch, watchEffect } from 'vue'
import { StorageItem } from '@/services/storage/StorageItem'

type Store<T extends StorageItem> = Map<string, T | undefined>
type Subscriptions = Map<string, Set<string> | undefined>

type StorageSubscription<T extends StorageItem | StorageItem[]> = {
  value: ComputedRef<T | undefined>,
  unsubscribe: Unsubscribe,
}

export type Unsubscribe = () => void

function waitForCondition<T>(input: Ref<T>, condition: (value: T) => boolean): Promise<void> {
  return new Promise(resolve => {
    watchEffect(() => {
      if (condition(input.value)) {
        resolve()
      }
    })
  })
}

export class Storage<T extends StorageItem> {
  private readonly subscriptions: Subscriptions = new Map()
  private readonly store: Store<T> = reactive(new Map())

  public add(input: T | Ref<T | undefined>): void {
    const inputRef = ref(input) as Ref<T | undefined>
    const value = unref(inputRef)

    if (value === undefined) {
      this.addWhenDefined(inputRef)
      return
    }

    if (this.isNewValue(value)) {
      this.store.set(value.id, value)
    }
  }

  private async addWhenDefined(input: Ref<T | undefined>): Promise<void> {
    await waitForCondition(input, isDefined)

    this.add(input)
  }

  public remove(id: string): void {
    this.subscriptions.delete(id)
    this.store.delete(id)
  }

  public addAll(inputs: T[] | Ref<T[] | undefined>): void {
    const inputsRef = ref(inputs) as Ref<T[] | undefined>
    const values = unref(inputsRef)

    if (values === undefined) {
      this.addAllWhenDefined(inputsRef)
      return
    }

    values.forEach(value => this.add(value))
  }

  private async addAllWhenDefined(input: Ref<T[] | undefined>): Promise<void> {
    await waitForCondition(input, isDefined)

    this.addAll(input)
  }

  public removeAll(ids: string[]): void {
    ids.forEach(id => this.remove(id))
  }

  public subscribe(id: string | Ref<string | null | undefined>): StorageSubscription<T> {
    const idRef = ref(id)

    const value = computed(() => {
      if (idRef.value) {
        this.store.get(idRef.value)
      }

      return undefined
    })


    let unsubscribe: Unsubscribe | undefined = undefined

    watch(idRef, (id) => {
      if (!id) {
        return
      }

      unsubscribe?.()

      const subscriptionId = crypto.randomUUID()
      const subscriptions = this.getSubscription(id)

      subscriptions.add(subscriptionId)

      unsubscribe = () => this.unsubscribe(id, subscriptionId)
    }, { immediate: true })

    return {
      value,
      unsubscribe: () => unsubscribe?.(),
    }
  }

  public subscribeAll(ids: string[] | Ref<string[] | null | undefined>): StorageSubscription<T[]> {
    const idsRef = ref(ids)

    const value = computed(() => {
      if (idsRef.value) {
        return idsRef.value.map(id => this.store.get(id)).filter(isDefined)
      }

      return undefined
    })


    let unsubscribe: Unsubscribe | undefined = undefined

    watch(idsRef, (ids) => {
      if (!ids) {
        return
      }

      unsubscribe?.()

      const unsubscribes = ids.map<Unsubscribe>(id => {
        const subscriptionId = crypto.randomUUID()
        const subscriptions = this.getSubscription(id)

        subscriptions.add(subscriptionId)

        return () => this.unsubscribe(id, subscriptionId)
      })

      unsubscribe = () => unsubscribes.forEach(unsubscribe => unsubscribe())
    }, { immediate: true })

    return {
      value,
      unsubscribe: () => unsubscribe?.(),
    }

  }

  private unsubscribe(id: string, subscriptionId: string): void {
    const subscriptions = this.getSubscription(id)

    subscriptions.delete(subscriptionId)

    if (subscriptions.size === 0) {
      this.remove(id)
    }
  }

  private getSubscription(id: string): Set<string> {
    const existing = this.subscriptions.get(id)

    if (existing) {
      return existing
    }

    const newSubscriptionSet = new Set<string>()

    this.subscriptions.set(id, newSubscriptionSet)

    return newSubscriptionSet
  }

  private isNewValue(input: T): boolean {
    const existing = this.store.get(input.id)

    if (existing && existing.timestamp.getTime() > input.timestamp.getTime()) {
      return false
    }

    return true
  }
}