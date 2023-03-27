export class BatchLookupError extends Error {
  public constructor(id: unknown) {
    super(`Batch lookup failed for id: ${JSON.stringify(id)}`)
  }
}