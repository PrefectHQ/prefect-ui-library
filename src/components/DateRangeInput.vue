<template>
  <p-date-range-input v-model:startDate="adjustedStartDate" v-model:endDate="adjustedEndDate" />
</template>

<script lang="ts" setup>
  import { utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz'
  import { computed } from 'vue'
  import { selectedTimezone } from '@/utilities/dates'

  const props = defineProps<{
    startDate: Date | null | undefined,
    endDate: Date | null | undefined,
  }>()

  const emits = defineEmits<{
    (event: 'update:startDate' | 'update:endDate', value: Date | null): void,
  }>()

  const adjustedStartDate = computed({
    get() {
      if (selectedTimezone.value && props.startDate) {
        return utcToZonedTime(props.startDate, selectedTimezone.value)
      }

      return props.startDate ?? null
    },
    set(value: Date | null) {
      if (selectedTimezone.value && value) {
        return emits('update:startDate', zonedTimeToUtc(value, selectedTimezone.value))
      }

      emits('update:startDate', value ?? null)
    },
  })

  const adjustedEndDate = computed({
    get() {
      if (selectedTimezone.value && props.endDate) {
        return utcToZonedTime(props.endDate, selectedTimezone.value)
      }

      return props.endDate ?? null
    },
    set(value: Date | null) {
      if (selectedTimezone.value && value) {
        return emits('update:endDate', zonedTimeToUtc(value, selectedTimezone.value))
      }

      emits('update:endDate', value ?? null)
    },
  })
</script>