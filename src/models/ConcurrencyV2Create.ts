export type ConcurrencyV2Create = {
  active?: boolean,
  name?: string,
  limit?: number,
  activeSlots?: number,
  deniedSlots?: number,
  slotDecayPerSecond?: number,
}