<template>
  <p-combobox v-model="internalValue" :options="options" />
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { intl } from '@/utilities/intl'

  const props = defineProps<{
    modelValue: string | null,
  }>()

  const emit = defineEmits<{
    (event: 'update:modelValue', value: string | null): void,
  }>()

  const internalValue = computed({
    get() {
      return props.modelValue ?? 'UTC'
    },
    set(val) {
      emit('update:modelValue', val)
    },
  })

  const options = intl.timeZone()
</script>