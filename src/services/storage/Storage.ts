import { isDefined, randomId } from '@prefecthq/prefect-design'
import { reactive } from 'vue'
import { StorageItem } from '@/services/storage/StorageItem'

type Store<T extends StorageItem> = Map<string, T | undefined>
type Subscriptions = Map<string, Set<string> | undefined>

export type Unsubscribe = () => void

export class Storage<T extends StorageItem> {
  private readonly subscriptions: Subscriptions = new Map()
  private readonly store: Store<T> = reactive(new Map())

  public add(value: T): void {
    if (this.isNewValue(value)) {
      this.store.set(value.id, value)
    }
  }

  public remove(id: string): void {
    this.subscriptions.delete(id)
    this.store.delete(id)
  }

  public get(id: string): T | undefined {
    return this.store.get(id)
  }

  public addAll(values: T[]): void {
    values.forEach(value => this.add(value))
  }

  public removeAll(ids: string[]): void {
    ids.forEach(id => this.remove(id))
  }

  public getAll(ids: string[]): T[] {
    return ids.map(id => this.get(id)).filter(isDefined)
  }

  public subscribe(id: string): Unsubscribe {
    const subscriptionId = randomId()
    const subscriptions = this.getSubscription(id)

    subscriptions.add(subscriptionId)

    return () => this.unsubscribe(id, subscriptionId)
  }

  public unsubscribe(id: string, subscriptionId: string): void {
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

    if (existing && existing.storageTimestamp.getTime() > input.storageTimestamp.getTime()) {
      return false
    }

    return true
  }
}