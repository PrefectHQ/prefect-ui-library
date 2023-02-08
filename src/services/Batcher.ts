import { MaybePromise } from '@/types'

export type BatchCallbackLookup<V, R> = (value: V) => MaybePromise<R>
export type BatchCallback<V, R> = (values: V[]) => MaybePromise<Map<V, R>> | BatchCallbackLookup<V, R>
export type BatchOptions = {
  maxBatchSize?: number,
  maxCycles?: number,
}

type Batch<V, R> = Map<V, BatchPromise<R>>
type BatchPromise<T> = {
  resolve: (value: T) => void,
  reject: (reason?: unknown) => void,
}

export class Batcher<V, R> {
  private readonly queue: Batch<V, R> = new Map()
  private timeout: ReturnType<typeof setTimeout> | null = null
  private readonly callback: BatchCallback<V, R>
  private readonly options: BatchOptions
  private readonly loops: number = 0

  public constructor(callback: BatchCallback<V, R>, options: BatchOptions = {}) {
    this.callback = callback
    this.options = options
  }

  public batch(value: V): Promise<R> {

    const response = new Promise<R>((resolve, reject) => {
      this.queue.set(value, { resolve, reject })
    })

    this.requestBatchProcessOnNextCycle()

    return response
  }

  private requestBatchProcessOnNextCycle(): void {
    if (this.timeout) {
      clearTimeout(this.timeout)
    }

    const { maxBatchSize = Infinity } = this.options

    if (this.queue.size >= maxBatchSize) {
      this.processQueue()
      return
    }

    const maxCycles = this.options.maxCycles ?? 100

    if (this.loops >= maxCycles) {
      this.processQueue()
      return
    }

    this.timeout = setTimeout(() => this.processQueue())
  }

  private getBatchToProcess(): Map<V, BatchPromise<R>> {
    const batch = new Map(this.queue)
    this.queue.clear()

    return batch
  }

  private async processQueue(): Promise<void> {
    const batch = this.getBatchToProcess()
    const values = Array.from(batch.keys())

    try {
      const response = await this.callback(values)

      if (typeof response === 'function') {
        return this.resolveBatchUsingLookup(batch, response)
      }

      return this.resolveBatch(batch, response)

    } catch (error) {
      this.rejectBatch(batch, error)
    }
  }

  private resolveBatch(batch: Batch<V, R>, map: Map<V, R>): void {
    batch.forEach(({ resolve }, id) => {
      resolve(map.get(id)!)
    })
  }

  private resolveBatchUsingLookup(batch: Batch<V, R>, lookup: BatchCallbackLookup<V, R>): void {
    batch.forEach(async ({ resolve }, id) => {
      resolve(await lookup(id))
    })
  }

  private rejectBatch(batch: Batch<V, R>, error: unknown): void {
    batch.forEach(({ reject }) => reject(error))
  }

}