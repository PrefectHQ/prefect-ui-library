<template>
  <p-select v-model="internalValue" :options="options" class="logs-sort" />
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { LogSortOptions, LogSortValues } from '@/types/SortOptionTypes'

  const props = defineProps<{
    selected: LogSortValues,
  }>()

  const emits = defineEmits<{
    (event: 'update:selected', value: LogSortValues): void,
  }>()

  const internalValue = computed({
    get() {
      return props.selected
    },
    set(value) {
      emits('update:selected', value)
    },
  })

  const options: LogSortOptions = [
    { label: 'Newest to oldest', value: 'TIMESTAMP_DESC' },
    { label: 'Oldest to newest', value: 'TIMESTAMP_ASC' },
  ]
</script>
