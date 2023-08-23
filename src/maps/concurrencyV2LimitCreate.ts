import { ConcurrencyV2CreateRequest } from '@/models/api/ConcurrencyV2CreateRequest'
import { ConcurrencyV2Create } from '@/models/ConcurrencyV2Create'
import { MapFunction } from '@/services/Mapper'

export const mapConcurrencyV2CreateToConcurrencyV2CreateRequest: MapFunction<ConcurrencyV2Create, ConcurrencyV2CreateRequest> = function(source) {
  const {
    active,
    name,
    limit,
  } = source

  return {
    active,
    name,
    limit,
    active_slots: source.activeSlots,
    denied_slots: source.deniedSlots,
    slot_decay_per_second: source.slotDecayPerSecond,
  }
}