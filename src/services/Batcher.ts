import { MaybePromise } from '@/types'

export type BatchCallbackLookup<V, R> = (value: V) => MaybePromise<R>
export type BatchCallback<V, R> = (values: V[]) => MaybePromise<Map<V, R>> | BatchCallbackLookup<V, R>
export type BatchOptions = {
  maxBatchSize?: number,
  maxCycles?: number,
}

type Resolve<V> = (value: V) => void
type Reject = (reason?: unknown) => void
type BatchQueueValue<V, R> = {
  response: Promise<R>,
  resolve: Resolve<R>,
  reject: Reject,
}

type BatchQueue<V, R> = Map<V, BatchQueueValue<V, R>>

export class Batcher<V, R> {
  private readonly queue: BatchQueue<V, R> = new Map()
  private timeout: ReturnType<typeof setTimeout> | null = null
  private readonly callback: BatchCallback<V, R>
  private readonly options: BatchOptions
  private readonly loops: number = 0

  public constructor(callback: BatchCallback<V, R>, options: BatchOptions = {}) {
    this.callback = callback
    this.options = options
  }

  public batch(value: V): Promise<R> {
    if (this.queue.has(value)) {
      const { response } = this.queue.get(value)!

      return response
    }

    let resolve!: Resolve<R>
    let reject!: Reject

    const response = new Promise<R>((...args) => {
      [resolve, reject] = args
    })

    this.queue.set(value, {
      response,
      resolve,
      reject,
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

  private getBatchToProcess(): BatchQueue<V, R> {
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

  private resolveBatch(batch: BatchQueue<V, R>, map: Map<V, R>): void {
    batch.forEach(({ resolve }, id) => {
      resolve(map.get(id)!)
    })
  }

  private resolveBatchUsingLookup(batch: BatchQueue<V, R>, lookup: BatchCallbackLookup<V, R>): void {
    batch.forEach(async ({ resolve }, id) => {
      resolve(await lookup(id))
    })
  }

  private rejectBatch(batch: BatchQueue<V, R>, error: unknown): void {
    batch.forEach(({ reject }) => reject(error))
  }

}