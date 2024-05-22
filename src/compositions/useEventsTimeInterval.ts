import { useElementRect } from '@prefecthq/vue-compositions'
import { computed, ref, ComputedRef, MaybeRef } from 'vue'

export type UseEventsTimeInterval = {
  interval: ComputedRef<number | null>,
}

export type UseEventsTimeIntervalArgs = {
  startDate: MaybeRef<Date>,
  endDate: MaybeRef<Date>,
  container: MaybeRef<HTMLElement | undefined>,
}

const BUCKET_INTERVALS = [
  0.01,
  0.025,
  0.05,
  0.075,
  0.1,
  0.25,
  0.5,
  0.75,
  1,
  2.5,
  5,
  7.5,
  10,
  25,
  50,
  75,
  100,
  250,
  500,
  750,
  1000,
  2500,
  5000,
  7500,
  10000,
]
const DESIRED_BUCKET_WIDTH = 15

export function useEventsTimeInterval({
  startDate,
  endDate,
  container,
}: UseEventsTimeIntervalArgs): UseEventsTimeInterval {
  const startDateRef = ref(startDate)
  const endDateRef = ref(endDate)
  const containerRef = ref(container)
  const rangeInSeconds = computed(() => (endDateRef.value.getTime() - startDateRef.value.getTime()) / 1000)
  const { width } = useElementRect(containerRef)

  const desiredBuckets = computed(() => {
    return Math.max(1, Math.floor(width.value / DESIRED_BUCKET_WIDTH))
  })

  const interval = computed(() => {
    if (!containerRef.value) {
      return null
    }

    const goal = rangeInSeconds.value / desiredBuckets.value

    const closestBucketIntervalToGoal = BUCKET_INTERVALS.reduce((interval, possibility) => {
      return Math.abs(possibility - goal) < Math.abs(interval - goal) ? possibility : interval
    })

    return closestBucketIntervalToGoal
  })

  return {
    interval,
  }
}