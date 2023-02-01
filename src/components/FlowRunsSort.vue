<template>
  <p-select v-model="internalValue" :options="flowRunSortOptions" />
</template>

<script lang="ts" setup>
  import { PSelect } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import { FlowRunSortOptions, FlowRunSortValues } from '@/types/SortOptionTypes'

  const props = defineProps<{
    modelValue: FlowRunSortValues | null | undefined,
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

  const flowRunSortOptions: FlowRunSortOptions = [
    { label: 'Newest to oldest', value: 'START_TIME_DESC' },
    { label: 'Oldest to newest', value: 'START_TIME_ASC' },
    { label: 'A to Z', value: 'NAME_ASC' },
    { label: 'Z to A', value: 'NAME_DESC' },
  ]
</script>
