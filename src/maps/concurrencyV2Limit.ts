import { ConcurrencyV2Response } from '@/models/api/ConcurrencyV2Response'
import { ConcurrencyV2Limit } from '@/models/ConcurrencyV2Limit'
import { MapFunction } from '@/services/Mapper'

export const mapConcurrencyV2ResponseToConcurrencyV2Limit: MapFunction<ConcurrencyV2Response, ConcurrencyV2Limit> = function(source) {
  const {
    id,
    created,
    updated,
    active,
    name,
    limit,
  } = source

  return {
    id,
    created,
    updated,
    active,
    name,
    limit,
    activeSlots: source.active_slots,
    deniedSlots: source.denied_slots,
    slotDecayPerSecond: source.slot_decay_per_second,
    avgSlotOccupancySeconds: source.avg_slot_occupancy_seconds,
  }
}