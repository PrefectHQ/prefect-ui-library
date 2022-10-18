<template>
  <p-date-input v-model="adjustedSelectedDate" />
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { useAdjustedDate, useUnadjustedDate } from '@/compositions/useAdjustedDate'

  const props = defineProps<{
    modelValue: Date | null | undefined,
  }>()

  const emits = defineEmits<{
    (event: 'update:modelValue', value: Date | null): void,
  }>()

  const adjustedSelectedDate = computed({
    get() {
      return props.modelValue ? useAdjustedDate(props.modelValue) : null
    },
    set(value: Date | null) {
      emits('update:modelValue', value ? useUnadjustedDate(value) : null)
    },
  })
</script>