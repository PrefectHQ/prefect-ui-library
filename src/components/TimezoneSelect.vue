<template>
  <p-combobox v-model="internalValue" :options="options" />
</template>

<script lang="ts" setup>
  import { SelectOption } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import { timezones } from '@/utilities'

  const props = defineProps<{
    modelValue: string | null,
  }>()

  const emit = defineEmits<{
    (event: 'update:modelValue', value: string | null): void,
  }>()

  const internalValue = computed({
    get() {
      return props.modelValue
    },
    set(val) {
      emit('update:modelValue', val)
    },
  })
  const options: SelectOption[] = timezones.map((timezone) => ({ label: timezone, value: timezone === 'UTC' ? null : timezone }))
</script>