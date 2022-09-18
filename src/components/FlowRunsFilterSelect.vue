<template>
  <p-select v-model="selectedFilter" :options="options" class="flow-runs-filter-select" />
</template>

<script setup lang="ts">
  import { computed } from 'vue'

  const props = defineProps<{
    selected: string,
  }>()

  const emit = defineEmits<{
    (event: 'update:selected', value: string): void,
  }>()

  const selectedFilter = computed({
    get() {
      return props.selected
    },
    set(value: string) {
      emit('update:selected', value)
    },
  })

  const options: { label: string, value: string }[] = [
    { label: 'One Week (default)', value: 'week' },
    { label: 'One Day', value: 'day' },
    { label: 'No Scheduled Runs', value: 'noScheduled' },
  ]
</script>