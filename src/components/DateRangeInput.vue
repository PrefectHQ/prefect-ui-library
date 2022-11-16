<template>
  <p-date-range-input v-model:startDate="adjustedStartDate" v-model:endDate="adjustedEndDate" />
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { assignTimezone, unassignTimezone } from '@/utilities/timezone'

  const props = defineProps<{
    startDate: Date | null | undefined,
    endDate: Date | null | undefined,
  }>()

  const emits = defineEmits<{
    (event: 'update:startDate' | 'update:endDate', value: Date | null): void,
  }>()

  const adjustedStartDate = computed({
    get() {
      return props.startDate ? assignTimezone(props.startDate) : null
    },
    set(value: Date | null) {
      emits('update:startDate', value ? unassignTimezone(value) : null)
    },
  })

  const adjustedEndDate = computed({
    get() {
      return props.endDate ? assignTimezone(props.endDate) : null
    },
    set(value: Date | null) {
      emits('update:endDate', value ? unassignTimezone(value) : null)
    },
  })
</script>