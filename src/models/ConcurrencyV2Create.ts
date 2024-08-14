export type ConcurrencyV2Create = {
  active?: boolean,
  name?: string,
  limit?: number,
  deniedSlots?: number,
  slotDecayPerSecond?: number,
}
