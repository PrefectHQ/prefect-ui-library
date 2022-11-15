<template>
  <p-combobox v-model="internalValue" :options="options">
    <template v-for="(index, name) in $slots" #[name]="data">
      <slot :name="name" v-bind="data" />
    </template>
  </p-combobox>
</template>

<script lang="ts" setup>
  import { SelectOption } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import { utcTimezone } from '@/utilities/dates'

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

  const timezones = Intl.supportedValuesOf('timeZone').map(timezone => ({ label: timezone, value: timezone }))
  const options: SelectOption[] = [
    { label: 'Use browser default', value: null },
    { label: 'UTC', value: utcTimezone },
    ...timezones,
  ]
</script>