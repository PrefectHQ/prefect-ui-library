export type ConcurrencyV2IncrementActiveSlotsRequest = {
  slots: number,
  names: string[],
  occupancy_seconds: number,
}