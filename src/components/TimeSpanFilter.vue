<template>
  <p-button-group v-model="selected" :size="size" :options="options" class="time-span-filter" />
</template>

<script lang="ts" setup>
  import { ButtonGroupOption, Size } from '@prefecthq/prefect-design'
  import { secondsInDay, secondsInHour, secondsInWeek } from 'date-fns'
  import { computed } from 'vue'

  const props = defineProps<{
    selected: number,
    size?: Size,
  }>()

  const emit = defineEmits<{
    (event: 'update:selected', value: number): void,
  }>()

  const selected = computed({
    get: () => props.selected,
    set: (value) => emit('update:selected', value),
  })

  const options: ButtonGroupOption[] = [
    { label: '8h', value: secondsInHour * 8 },
    { label: '24h', value: secondsInDay },
    { label: '1w', value: secondsInWeek },
  ]
</script>