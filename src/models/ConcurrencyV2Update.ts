export type ConcurrencyV2Update = {
  active?: boolean,
  name?: string,
  limit?: number,
  activeSlots?: number,
  deniedSlots?: number,
  slotDecayPerSecond?: number,
}