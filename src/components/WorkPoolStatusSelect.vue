<template>
  <p-select v-model="internalSelected" :options="options" />
</template>

<script lang="ts" setup>
  import { SelectOption } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import { WorkPoolStatus } from '@/models/WorkPoolStatus'

  type StatusOption = SelectOption & {
    value: WorkPoolStatus,
  }

  const props = defineProps<{
    selected: WorkPoolStatus | null,
  }>()

  const emit = defineEmits<{
    (event: 'update:selected', value: WorkPoolStatus | null): void,
  }>()

  const options: StatusOption[] = [
    { label: 'Ready', value: 'ready' },
    { label: 'Not Ready', value: 'not_ready' },
    { label: 'Paused', value: 'paused' },
  ]

  const internalSelected = computed({
    get() {
      return props.selected
    },
    set(value) {
      emit('update:selected', value)
    },
  })
</script>