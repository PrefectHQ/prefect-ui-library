<template>
  <p-select v-model="internalSelected" class="work-queue-status-select" :options="options" />
</template>

<script lang="ts" setup>
  import { SelectOption } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import { WorkPoolQueueStatus, getWorkPoolQueueStatusLabel, workPoolQueueStatus } from '@/models/WorkPoolQueue'

  const props = defineProps<{
    selected: WorkPoolQueueStatus,
  }>()

  const emit = defineEmits<{
    (event: 'update:selected', value: WorkPoolQueueStatus): void,
  }>()

  type WorkQueueStatusOption = SelectOption & {
    value: WorkPoolQueueStatus,
  }
  const options: WorkQueueStatusOption[] = workPoolQueueStatus.map(status => ({
    label: getWorkPoolQueueStatusLabel(status),
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