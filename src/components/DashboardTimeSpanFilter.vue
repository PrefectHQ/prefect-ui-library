<template>
  <p-button-group v-model="selected" :options="options" class="dashboard-time-span-filter" size="sm" />
</template>

<script lang="ts" setup>
  import { ButtonGroupOption } from '@prefecthq/prefect-design'
  import { secondsInDay, secondsInHour, secondsInWeek } from 'date-fns'
  import { computed } from 'vue'

  const props = defineProps<{
    selected: number,
  }>()

  const emit = defineEmits<{
    (event: 'update:selected', value: number): void,
  }>()

  const selected = computed({
    get: () => props.selected,
    set: (value) => emit('update:selected', value),
  })

  const options: ButtonGroupOption[] = [
    { label: '8H', value: secondsInHour * 8 },
    { label: '24H', value: secondsInDay },
    { label: '1W', value: secondsInWeek },
  ]
</script>