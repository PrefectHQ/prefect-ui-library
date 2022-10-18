import { useSubscription } from '@prefecthq/vue-compositions'
import { computed } from 'vue'
import { utcOffsetMinutes } from '@/compositions/useAdjustedDate'
import { InvalidTimezoneError } from '@/models/InvalidTimezoneError'
import { timezonesApi } from '@/services/TimezoneApi'

const timezoneSubscription = useSubscription(timezonesApi.getTimezones, [])
const timezones = computed(() => timezoneSubscription.response ?? {})

export async function setUtcOffsetMinutes(timezone: string | null): Promise<void> {
  if (timezone === null) {
    utcOffsetMinutes.value = null
    return
  }

  await timezoneSubscription.promise()
  const timezoneOffsetSeconds = timezones.value[timezone]

  if (timezoneOffsetSeconds === undefined) {
    throw new InvalidTimezoneError()
  }

  utcOffsetMinutes.value = timezoneOffsetSeconds / 60
}