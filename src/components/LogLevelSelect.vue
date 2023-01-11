<template>
  <p-select v-model="model" :options="options" class="log-level-select">
    <template #default="{ label }">
      Level: {{ label.toLowerCase() }}
    </template>
  </p-select>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { LogLevel } from '@/models'

  const props = defineProps<{
    selected: LogLevel,
  }>()

  const emit = defineEmits<{
    (event: 'update:selected', value: LogLevel): void,
  }>()

  const model = computed({
    get() {
      return props.selected
    },
    set(value: LogLevel) {
      emit('update:selected', value)
    },
  })

  const options: { label: string, value: LogLevel }[] = [
    { label: 'All', value: 0 },
    { label: 'Critical only', value: 50 },
    { label: 'Error and above', value: 40 },
    { label: 'Warning and above', value: 30 },
    { label: 'Info and above', value: 20 },
    { label: 'Debug and above', value: 10 },
  ]
</script>