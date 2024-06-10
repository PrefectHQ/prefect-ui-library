<template>
  <p-select v-model="internalSelected" :options="options" />
</template>

<script lang="ts" setup>
  import { SelectOption } from '@prefecthq/prefect-design'
  import { capitalize, computed } from 'vue'
  import { DeploymentStatus, deploymentStatus, getDeploymentStatusLabel } from '@/models/DeploymentStatus'

  type StatusOption = SelectOption & {
    value: DeploymentStatus,
  }

  const props = defineProps<{
    selected: DeploymentStatus,
  }>()

  const emit = defineEmits<{
    (event: 'update:selected', value: DeploymentStatus): void,
  }>()

  const options: StatusOption[] = deploymentStatus.map(status => ({
    label: capitalize(getDeploymentStatusLabel(status)),
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