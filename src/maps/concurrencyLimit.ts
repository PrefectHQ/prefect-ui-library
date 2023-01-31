import { ConcurrencyLimitResponse } from '@/models/api/ConcurrencyLimitResponse'
import { ConcurrencyLimit } from '@/models/ConcurrencyLimit'
import { MapFunction } from '@/services/Mapper'

export const mapConcurrencyLimitResponseToConcurrencyLimit: MapFunction<ConcurrencyLimitResponse, ConcurrencyLimit> = function(source) {
  const { tag, id, created, updated } = source

  return {
    tag,
    id,
    created,
    updated,
    activeSlots: source.active_slots,
    concurrencyLimit: source.concurrency_limit,
  }
}