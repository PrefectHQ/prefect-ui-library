import { ConcurrencyLimitCreateRequest } from '@/models/api/ConcurrencyLimitCreateRequest'
import { ConcurrencyLimitCreate } from '@/models/ConcurrencyLimitCreate'
import { MapFunction } from '@/services/Mapper'

export const mapConcurrencyLimitCreateToConcurrencyLimitCreateRequest: MapFunction<ConcurrencyLimitCreate, ConcurrencyLimitCreateRequest> = function(source) {
  const { tag } = source

  return {
    tag,
    concurrency_limit: source.concurrencyLimit,
  }
}