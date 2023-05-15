export abstract class StorageItem {
  public abstract readonly id: string

  public readonly storageTimestamp = new Date()
}