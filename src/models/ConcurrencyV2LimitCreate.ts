export type ConcurrencyV2LimitCreate = {
  active: boolean,
  name: string,
  limit: number,
  activeSlots: number,
  deniedSlots: number,
  slotDecayPerSecond: number,
}