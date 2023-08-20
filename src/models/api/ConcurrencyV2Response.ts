export type ConcurrencyV2Response = {
  id: string,
  created: Date,
  updated: Date,
  active: boolean,
  name: string,
  limit: number,
  active_slots: number,
  denied_slots: number,
  slot_decay_per_second: number,
  avg_slot_occupancy_seconds: number,
}