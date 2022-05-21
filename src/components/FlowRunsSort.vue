<template>
  <div class="flow-run-sort">
    <p-select v-model="internalValue" :options="sortOptions" />
  </div>
</template>

<script lang="ts" setup>
  import { PSelect, SelectModelValue } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import { FlowRunSortOptions } from  '../types/sortOptionTypes'

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

  const sortOptions: FlowRunSortOptions = [
    { label: 'Newest to Oldest', value: 'EXPECTED_START_TIME_ASC' },
    { label: 'Oldest to Newest', value: 'EXPECTED_START_TIME_DESC' },
    { label: 'A to Z', value: 'NAME_ASC' },
    { label: 'Z to A', value: 'NAME_DESC' },
  ]
</script>

<style>
  .flow-run-sort{}
</style>