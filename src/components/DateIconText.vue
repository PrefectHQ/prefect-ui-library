<template>
  <p-icon-text icon="CalendarIcon" class="date-icon-text">
    <span>{{ label }}</span>
  </p-icon-text>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { formatDateTimeNumeric } from '@/utilities'

  const props = defineProps<{
    date: Date | null,
  }>()

  const label = computed(() => props.date == null ? 'None' : formatDateTimeNumeric(props.date))
</script>