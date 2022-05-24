<template>
  <div class="flow-runs-sort">
    <p-select v-model="internalValue" :options="flowRunSortOptions" />
  </div>
</template>

<script lang="ts" setup>
  import { PSelect, SelectModelValue } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import { FlowRunSortOptions } from  '../types/SortOptionTypes'

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
    { label: 'Newest to Oldest', value: 'EXPECTED_START_TIME_DESC' },
    { label: 'Oldest to Newest', value: 'EXPECTED_START_TIME_ASC' },
    { label: 'A to Z', value: 'NAME_ASC' },
    { label: 'Z to A', value: 'NAME_DESC' },
  ]
</script>

<style>
  .flow-runs-sort{}
</style>