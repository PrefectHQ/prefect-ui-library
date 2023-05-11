export abstract class StorageItem {
  public abstract readonly id: string
  public readonly timestamp = new Date()
}