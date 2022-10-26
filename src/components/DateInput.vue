<template>
  <p-date-input
    v-model="adjustedSelectedDate"
    :show-time="showTime"
    :min="adjustedMin"
    :max="adjustedMax"
  />
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { utcToZonedTime, zonedTimeToUtc } from '@/utilities/dates'

  const props = defineProps<{
    modelValue: Date | null | undefined,
    showTime?: boolean,
    min?: Date | null | undefined,
    max?: Date | null | undefined,
  }>()

  const emits = defineEmits<{
    (event: 'update:modelValue', value: Date | null): void,
  }>()

  const adjustedSelectedDate = computed({
    get() {
      return props.modelValue ? utcToZonedTime(props.modelValue) : null
    },
    set(value: Date | null) {
      emits('update:modelValue', value ? zonedTimeToUtc(value) : null)
    },
  })

  const adjustedMin = computed(() => {
    return props.min ? utcToZonedTime(props.min) : null
  })

  const adjustedMax = computed(() => {
    return props.max ? utcToZonedTime(props.max) : null
  })
</script>