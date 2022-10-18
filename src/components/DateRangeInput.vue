<template>
  <p-date-range-input v-model:startDate="adjustedStartDate" v-model:endDate="adjustedEndDate" />
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { useAdjustedDate, useUnadjustedDate } from '@/compositions/useAdjustedDate'

  const props = defineProps<{
    startDate: Date | null | undefined,
    endDate: Date | null | undefined,
  }>()

  const emits = defineEmits<{
    (event: 'update:startDate' | 'update:endDate', value: Date | null): void,
  }>()

  const adjustedStartDate = computed({
    get() {
      return props.startDate ? useAdjustedDate(props.startDate) : null
    },
    set(value: Date | null) {
      emits('update:startDate', value ? useUnadjustedDate(value) : null)
    },
  })

  const adjustedEndDate = computed({
    get() {
      return props.endDate ? useAdjustedDate(props.endDate) : null
    },
    set(value: Date | null) {
      emits('update:endDate', value ? useUnadjustedDate(value) : null)
    },
  })
</script>