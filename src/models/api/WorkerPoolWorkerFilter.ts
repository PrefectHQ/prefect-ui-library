type operator_ = 'and_' | 'or_'

export type WorkerPoolWorkerFilter = {
  workers?: {
    operator?: operator_,
    last_heartbeat_time?: {
      before_?: string,
      after_?: string,
    },
  },
  limit?: number,
  offset?: number,
}