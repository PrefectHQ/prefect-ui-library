export type ConcurrencyV2UpdateRequest = {
  active?: boolean,
  name?: string,
  limit?: number,
  active_slots?: number,
  denied_slots?: number,
  slot_decay_per_second?: number,
}