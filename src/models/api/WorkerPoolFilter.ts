type any_ = { any_?: string[] }
type operator_ = 'and_' | 'or_'

export type WorkerPoolFilter = {
  worker_pools?: {
    operator?: operator_,
    id?: any_,
    name?: any_,
    type?: any_,
  },
  limit?: number,
  offset?: number,
}