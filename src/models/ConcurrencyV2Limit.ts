export type ConcurrencyV2Limit = {
  id: string,
  created: Date,
  updated: Date,
  active?: boolean,
  name: string,
  limit: number,
  activeSlots?: number,
  deniedSlots?: number,
  slotDecayPerSecond?: number,
  avgSlotOccupancySeconds?: number,
}