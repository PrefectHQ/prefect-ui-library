<template>
  <p-select v-model="internalValue" :options="taskRunSortOptions" />
</template>

<script lang="ts" setup>
  import { PSelect, SelectModelValue } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import { TaskRunSortOptions } from  '../types/SortOptionTypes'

  const props = defineProps<{
    modelValue: string,
  }>()

  const emits = defineEmits<{
    (event: 'update:modelValue', value: SelectModelValue): void,
  }>()

  const internalValue = computed({
    get() {
      return props.modelValue
    },
    set(value: SelectModelValue) {
      emits('update:modelValue', value)
    },
  })

  const taskRunSortOptions: TaskRunSortOptions = [
    { label: 'Newest to Oldest', value: 'EXPECTED_START_TIME_DESC' },
    { label: 'Oldest to Newest', value: 'EXPECTED_START_TIME_ASC' },
  ]
</script>
