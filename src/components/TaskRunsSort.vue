<template>
  <p-select v-model="internalValue" :options="taskRunSortOptions" />
</template>

<script lang="ts" setup>
  import { PSelect } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import { TaskRunSortOptions } from '@/types/SortOptionTypes'

  const props = defineProps<{
    modelValue: string | null | undefined,
  }>()

  const emits = defineEmits<{
    (event: 'update:modelValue', value: string | null | undefined): void,
  }>()

  const internalValue = computed({
    get() {
      return props.modelValue
    },
    set(value) {
      emits('update:modelValue', value)
    },
  })

  const taskRunSortOptions: TaskRunSortOptions = [
    { label: 'Newest to Oldest', value: 'EXPECTED_START_TIME_DESC' },
    { label: 'Oldest to Newest', value: 'EXPECTED_START_TIME_ASC' },
  ]
</script>
