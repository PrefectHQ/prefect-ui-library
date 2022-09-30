type StorageType = 'session' | 'local'

export class StorageManager {
  private readonly type: StorageType

  public get length(): number {
    return this.storage().length
  }

  public constructor(type: StorageType) {
    this.type = type
  }

  public get<T>(key: string): T | null
  public get<T>(key: string, defaultValue: T): T
  public get<T>(key: string, defaultValue: T | null = null): T | null {
    const value = this.storage().getItem(key)

    if (value === null) {
      return defaultValue
    }

    return JSON.parse(value) as T
  }

  public set<T>(key: string, value: T): void {
    const string = JSON.stringify(value)

    return this.storage().setItem(key, string)
  }

  public remove(key: string): void {
    return this.storage().removeItem(key)
  }

  public clear(): void {
    return this.storage().clear()
  }

  public key(index: number): string | null {
    return this.storage().key(index)
  }

  private storage(): Storage {
    if (this.type === 'local') {
      return localStorage
    }

    return sessionStorage
  }
}

export const local = new StorageManager('local')
export const session = new StorageManager('session')