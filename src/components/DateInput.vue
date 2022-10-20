<template>
  <p-date-input v-model="adjustedSelectedDate" />
</template>

<script lang="ts" setup>
  import { utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz'
  import { computed } from 'vue'
  import { selectedTimezone } from '@/utilities/dates'

  const props = defineProps<{
    modelValue: Date | null | undefined,
  }>()

  const emits = defineEmits<{
    (event: 'update:modelValue', value: Date | null): void,
  }>()

  const adjustedSelectedDate = computed({
    get() {
      if (selectedTimezone.value && props.modelValue) {
        return utcToZonedTime(props.modelValue, selectedTimezone.value)
      }

      return props.modelValue ?? null
    },
    set(value: Date | null) {
      if (selectedTimezone.value && value) {
        return emits('update:modelValue', zonedTimeToUtc(value, selectedTimezone.value))
      }

      emits('update:modelValue', value ?? null)
    },
  })
</script>