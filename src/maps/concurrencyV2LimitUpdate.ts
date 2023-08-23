import { ConcurrencyV2UpdateRequest } from '@/models/api/ConcurrencyV2UpdateRequest'
import { ConcurrencyV2Update } from '@/models/ConcurrencyV2Update'
import { MapFunction } from '@/services/Mapper'

export const mapConcurrencyV2UpdateToConcurrencyV2UpdateRequest: MapFunction<ConcurrencyV2Update, ConcurrencyV2UpdateRequest> = function(source) {
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