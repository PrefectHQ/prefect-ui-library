<template>
  <p-select v-model="internalSelected" :options="options" />
</template>

<script lang="ts" setup>
  import { SelectOption } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import { WorkPoolStatus, getWorkPoolStatusLabel, workPoolStatus } from '@/models/WorkPoolStatus'

  type StatusOption = SelectOption & {
    value: WorkPoolStatus,
  }

  const props = defineProps<{
    selected: WorkPoolStatus | null,
  }>()

  const emit = defineEmits<{
    (event: 'update:selected', value: WorkPoolStatus | null): void,
  }>()

  const options: StatusOption[] = workPoolStatus.map(status => ({
    label: getWorkPoolStatusLabel(status),
    value: status,
  }))

  const internalSelected = computed({
    get() {
      return props.selected
    },
    set(value) {
      emit('update:selected', value)
    },
  })
</script>