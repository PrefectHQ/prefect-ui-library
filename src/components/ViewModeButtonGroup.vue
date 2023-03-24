<template>
  <p-button-group v-model="activeViewMode" :options="viewOptions" />
</template>

<script lang="ts" setup>
  import { ButtonGroupOption } from '@prefecthq/prefect-design'
  import { useActiveViewMode } from '@/utilities/artifactsViewMode'

  const { activeViewMode } = useActiveViewMode()

  const viewOptions: ButtonGroupOption[] = [
    { label: '', value: 'grid', icon: 'ViewGridIcon' },
    { label: '', value: 'rows', icon: 'ViewListIcon' },
  ]
</script>