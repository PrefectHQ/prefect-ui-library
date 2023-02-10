/* eslint-disable max-classes-per-file */
import { asArray } from '@/utilities'
import { mapValues } from '@/utilities/object'

export class DataStoreDataNotFound extends Error {
  public constructor() {
    super('Mocked data not found')
  }
}

// https://stackoverflow.com/questions/73732549/narrow-number-argument-of-function-to-be-literal-type?noredirect=1#comment130199140_73732549
// eslint-disable-next-line @typescript-eslint/ban-types
type NoInfer<T> = T & {}
type KeyedDataStoreFindCallback<T> = (value: T) => boolean
type KeyedDataStoreHydrateMethod<T> = (value: T) => T
type KeyedDataStoreOptions<T extends { id: K }, K extends string | number | symbol = T['id']> = {
  seeds?: T | T[],
  hydrate?: KeyedDataStoreHydrateMethod<T>,
}

export class KeyedDataStore<T extends { id: K }, K extends string | number | symbol = T['id']> {
  private _data: string = '{}'
  private readonly hydrate: KeyedDataStoreHydrateMethod<T> = (value) => value

  private get data(): Record<K, T> {
    const data: Record<K, T> = JSON.parse(this._data)

    return mapValues(data, (key, value) => this.hydrate(value))
  }

  private set data(value: Record<K, T>) {
    this._data = JSON.stringify(value)
  }

  public constructor({ seeds = [], hydrate }: KeyedDataStoreOptions<T>) {
    const data = {} as Record<K, T>

    this.data = asArray(seeds).reduce((data, seed) => {
      data[seed.id] = seed

      return data
    }, data)

    if (hydrate) {
      this.hydrate = hydrate
    }
  }

  public get(id: T['id']): T {
    const record = this.data[id]

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!record) {
      throw new DataStoreDataNotFound()
    }

    return record
  }

  public getAll(): T[] {
    return Object.values(this.data)
  }


  public find(condition: KeyedDataStoreFindCallback<T>): T | undefined {
    const data = this.getAll()

    return data.find(condition)
  }

  public findAll(condition: KeyedDataStoreFindCallback<T>): T[] {
    const data = this.getAll()

    return data.filter(condition)
  }

  public count(condition?: KeyedDataStoreFindCallback<T>): number {
    if (condition) {
      return this.findAll(condition).length
    }

    return this.getAll().length
  }

  public delete(id: T['id']): void {
    const { data } = this

    delete data[id]

    this.data = data
  }

  public deleteAll(ids: T['id'][]): void {
    ids.map(id => this.delete(id))
  }

  public create(record: T): T {
    this.data = {
      ...this.data,
      [record.id]: record,
    }

    return this.get(record.id)
  }

  public createAll(records: T[]): T[] {
    return records.map(record => this.create(record))
  }

  public patch<ID extends T['id']>(id: ID, update: Partial<T & { id: NoInfer<ID> }>): void {
    const original = this.get(id)
    const updated = { ...original, ...update }

    this.create(updated)
  }

  public drop(): void {
    this.data = {} as Record<K, T>
  }
}
