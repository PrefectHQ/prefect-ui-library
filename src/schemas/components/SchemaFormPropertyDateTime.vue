<template>
  <div class="schema-form-property-date-time">
    <div class="schema-form-property-date-time__input-container">
      <p-date-input v-model="value" show-time clearable class="schema-form-property-date-time__date-input" />
      <TimezoneSelect v-model="timezone" class="schema-form-property-date-time__timezone-select" hide-unset />
    </div>
    <p-code v-if="normalizedValue">
      {{ normalizedValue }}
    </p-code>
  </div>
</template>

<script lang="ts" setup>
  import { isNotNullish } from '@prefecthq/prefect-design'
  import { formatDate } from 'date-fns'
  import { getTimezoneOffset } from 'date-fns-tz'
  import { computed, onBeforeMount, ref, watch } from 'vue'
  import { TimezoneSelect } from '@/components'
  import { selectedTimezone, isInvalidDate, millisecondsInMinute, millisecondsInHour } from '@/utilities'

  const props = defineProps<{
    value: string | null | undefined,
  }>()

  const emit = defineEmits<{
    'update:value': [string | null | undefined],
  }>()

  const DATE_FORMAT = "yyyy-MM-dd'T'HH:mm:ss"

  // Note: these are doing almost the same thing except the first is handling some edge cases around fractional seconds
  const TIMEZONE_REGEX = /(\.\d{1,9})?([+-]\d{2}:?\d{2}|Z)$/
  const TIMEZONE_OFFSET_REGEX = /([+-]\d{2}:?\d{2}|Z)$/

  const timezone = ref<string>(selectedTimezone.value ?? 'UTC')
  const normalizedValue = computed(() => getNormalizedValue(props.value, timezone.value))

  onBeforeMount(() => {
    if (isNotNullish(props.value)) {
      timezone.value = getTimezoneNameFromString(props.value) ?? selectedTimezone.value ?? 'UTC'
    }
  })

  const value = computed({
    get() {
      if (isNotNullish(props.value)) {
        const replaced = getUnassignedTimezoneString(props.value)
        const parsed = new Date(replaced)

        if (isInvalidDate(parsed)) {
          return undefined
        }

        return parsed
      }

      return props.value
    },
    set(value) {
      if (isNotNullish(value)) {
        const normalized = getNormalizedValue(value, timezone.value)
        emit('update:value', normalized)
        return
      }

      emit('update:value', value)
    },
  })

  watch(timezone, () => {
    if (isNotNullish(timezone.value) && isNotNullish(props.value)) {
      const normalized = getNormalizedValue(props.value, timezone.value)
      emit('update:value', normalized)
    }
  })

  function getUnassignedTimezoneString(value: string): string {
    return value.replace(TIMEZONE_REGEX, '$1')
  }

  function getTimezoneNameFromString(value: string): string | null {
    const date = new Date(value)

    if (isInvalidDate(date)) {
      return null
    }

    const offsetMatch = value.match(TIMEZONE_OFFSET_REGEX)
    if (!offsetMatch) {
      return null
    }

    const [offset] = offsetMatch
    if (offset === 'Z') {
      return 'UTC'
    }

    const [hours, minutes] = offset.replace('+', '').split(':').map(Number)
    const offsetMinutes = hours * 60 + (hours >= 0 ? minutes : -minutes)

    const timezones = Intl.supportedValuesOf('timeZone')

    const matchingTimezone = timezones.find(tz => {
      const tzDate = new Date()
      const tzOffset = tzDate.toLocaleString('en-US', { timeZone: tz, timeZoneName: 'short' })
      const tzOffsetMatch = tzOffset.match(TIMEZONE_OFFSET_REGEX)
      if (!tzOffsetMatch) {
        return false
      }

      const [tzOffsetStr] = tzOffsetMatch
      if (tzOffsetStr === 'Z') {
        return offsetMinutes === 0
      }

      const [tzHours, tzMinutes] = tzOffsetStr.replace('+', '').split(':').map(Number)
      const tzOffsetMinutes = tzHours * 60 + (tzHours >= 0 ? tzMinutes : -tzMinutes)

      return tzOffsetMinutes === offsetMinutes
    })

    return matchingTimezone ?? null
  }

  function getTimezoneOffsetString(timezone: string | null): string {
    if (timezone == 'UTC' || !timezone) {
      return 'Z'
    }

    const offsetMilliseconds = getTimezoneOffset(timezone)

    const offsetSign = offsetMilliseconds >= 0 ? '+' : '-'
    const offsetHours = Math.abs(Math.floor(offsetMilliseconds / millisecondsInHour))
    const offsetMinutes = Math.abs(Math.floor(offsetMilliseconds % millisecondsInHour / millisecondsInMinute))
    return `${offsetSign}${offsetHours.toString().padStart(2, '0')}:${offsetMinutes.toString().padStart(2, '0')}`
  }

  function getNormalizedValue(value: Date | string | null | undefined, timezone: string): string | null | undefined {
    const offset = getTimezoneOffsetString(timezone)
    if (value instanceof Date) {
      return formatDate(value, DATE_FORMAT) + offset
    }

    if (isNotNullish(value)) {
      const unassigned = getUnassignedTimezoneString(value)
      const parsed = new Date(unassigned)

      if (isInvalidDate(parsed)) {
        return undefined
      }

      return formatDate(parsed, DATE_FORMAT) + offset
    }

    return value
  }
</script>

<style>
.schema-form-property-date-time { @apply
  flex
  flex-col
  gap-2
}

.schema-form-property-date-time__input-container { @apply
  flex
  gap-2
}

.schema-form-property-date-time__date-input { @apply
  grow
  shrink-0
}

.schema-form-property-date-time__timezone-select { @apply
  w-1/4
  shrink-0
}
</style>