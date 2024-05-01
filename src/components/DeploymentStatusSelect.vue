<template>
  <p-select v-model="internalSelected" :options="options" />
</template>

<script lang="ts" setup>
  import { SelectOption } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import { DeploymentStatus } from '@/models/DeploymentStatus'

  type StatusOption = SelectOption & {
    value: DeploymentStatus,
  }

  const props = defineProps<{
    selected: DeploymentStatus,
  }>()

  const emit = defineEmits<{
    (event: 'update:selected', value: DeploymentStatus): void,
  }>()

  const options: StatusOption[] = [
    { label: 'Ready', value: 'ready' },
    { label: 'Not Ready', value: 'not_ready' },
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