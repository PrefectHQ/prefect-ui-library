import { asArray } from '@prefecthq/prefect-design'

type SimpleDataStoreFindCallback<T> = (value: T) => boolean
type SimpleDataStoreHydrateMethod<T> = (value: T) => T
type SimpleDataStoreOptions<T> = {
  seeds?: T | T[],
  hydrate?: SimpleDataStoreHydrateMethod<T>,
}

export class SimpleDataStore<T> {
  private _data: string = '[]'
  private readonly hydrate: SimpleDataStoreHydrateMethod<T> = (value) => value

  private get data(): T[] {
    const data: T[] = JSON.parse(this._data)

    return data.map(value => this.hydrate(value))
  }

  private set data(value: T[]) {
    this._data = JSON.stringify(value)
  }

  public constructor({ seeds = [], hydrate }: SimpleDataStoreOptions<T>) {
    this.data = asArray(seeds)

    if (hydrate) {
      this.hydrate = hydrate
    }
  }

  public create(value: T): T {
    this.data = [...this.data, value]

    return value
  }

  public createAll(values: T[]): T[] {
    this.data = [...this.data, ...values]

    return values
  }

  public find(callback: SimpleDataStoreFindCallback<T>): T | undefined {
    return this.data.find(callback)
  }

  public findAll(callback: SimpleDataStoreFindCallback<T>): T[] {
    return this.data.filter(callback)
  }

  public getAll(): T[] {
    return this.data
  }

  public deleteAll(values: T[]): void {
    this.data = this.data.filter(value => !values.includes(value))
  }

  public drop(): void {
    this.data = []
  }
}