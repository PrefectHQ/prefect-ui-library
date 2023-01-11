<template>
  <p-select v-model="internalValue" :options="options" class="logs-sort" />
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import type { LogsRequestSort } from '@/models'

  const props = defineProps<{
    selected: LogsRequestSort,
  }>()

  const emits = defineEmits<{
    (event: 'update:selected', value: LogsRequestSort): void,
  }>()

  const internalValue = computed({
    get() {
      return props.selected
    },
    set(value: LogsRequestSort) {
      emits('update:selected', value)
    },
  })

  const options: { label: string, value: LogsRequestSort }[] = [
    { label: 'Newest to oldest', value: 'TIMESTAMP_DESC' },
    { label: 'Oldest to newest', value: 'TIMESTAMP_ASC' },
  ]
</script>
