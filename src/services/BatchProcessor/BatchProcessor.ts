import { BatchLookupError } from '@/models/BatchLookupError'
import { MaybePromise } from '@/types'

export type BatchCallbackLookup<V, R> = (value: V) => MaybePromise<R>
export type BatchCallback<V, R> = (values: V[]) => MaybePromise<Map<V, R> | BatchCallbackLookup<V, R>>
export type BatchOptions = {
  maxBatchSize?: number,
  maxWaitMilliseconds?: number,
}

type Timer = ReturnType<typeof setTimeout>
type Resolve<V> = (value: V) => void
type Reject = (reason?: unknown) => void
type BatchQueueValue<R> = {
  response: Promise<R>,
  resolve: Resolve<R>,
  reject: Reject,
}

type BatchQueue<V, R> = Map<V, BatchQueueValue<R>>

export class BatchProcessor<V, R> {
  private readonly callback: BatchCallback<V, R>
  private readonly options: BatchOptions
  private readonly queue: BatchQueue<V, R> = new Map()
  private timeout: Timer | undefined = undefined
  private waitingSince: number | null = null

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

    this.requestProcessQueue()

    return response
  }

  public process(): void {
    this.processQueue()
  }

  private requestProcessQueue(): void {
    if (this.shouldProcessNow()) {
      this.processQueue()
      return
    }

    this.waitToProcessQueue()
  }

  private waitToProcessQueue(): void {
    if (this.waitingSince === null) {
      this.waitingSince = Date.now()
    }

    clearTimeout(this.timeout)

    this.timeout = setTimeout(() => this.processQueue())
  }

  private shouldProcessNow(): boolean {
    return this.maxBatchSizeReached() || this.maxWaitReached()
  }

  private maxBatchSizeReached(): boolean {
    const { maxBatchSize = Infinity } = this.options

    return this.queue.size >= maxBatchSize
  }

  private maxWaitReached(): boolean {
    const { maxWaitMilliseconds = Infinity } = this.options
    const now = Date.now()
    const since = this.waitingSince ?? 0

    return now - since >= maxWaitMilliseconds
  }

  private getBatchToProcess(): BatchQueue<V, R> {
    const batch = new Map(this.queue)

    this.queue.clear()
    this.waitingSince = null

    clearTimeout(this.timeout)

    return batch
  }

  private async processQueue(): Promise<void> {
    const batch = this.getBatchToProcess()
    const values = Array.from(batch.keys())

    try {
      const response = await this.callback(values)

      if (this.isBatchCallbackLookup(response)) {
        return this.resolveBatchUsingLookup(batch, response)
      }

      return this.resolveBatchUsingMap(batch, response)

    } catch (error) {
      this.rejectBatch(batch, error)
    }
  }

  private resolveBatchUsingMap(batch: BatchQueue<V, R>, map: Map<V, R>): void {
    batch.forEach(({ resolve, reject }, id) => {
      const value = map.get(id)

      if (value === undefined) {
        reject(new BatchLookupError(id))
        return
      }

      resolve(value)
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

  private isBatchCallbackLookup(value: ReturnType<BatchCallback<V, R>>): value is BatchCallbackLookup<V, R> {
    return typeof value === 'function'
  }

}