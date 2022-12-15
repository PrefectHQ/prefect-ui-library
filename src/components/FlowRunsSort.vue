<template>
  <p-select v-model="internalValue" :options="flowRunSortOptions" />
</template>

<script lang="ts" setup>
  import { PSelect, SelectModelValue } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import { FlowRunSortOptions } from '@/types/SortOptionTypes'

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

  const flowRunSortOptions: FlowRunSortOptions = [
    { label: 'Newest to oldest', value: 'START_TIME_DESC' },
    { label: 'Oldest to newest', value: 'START_TIME_ASC' },
    { label: 'A to Z', value: 'NAME_ASC' },
    { label: 'Z to A', value: 'NAME_DESC' },
  ]
</script>
