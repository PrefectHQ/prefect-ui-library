<template>
  <p-button-group v-model="activeViewMode" :options="viewOptions" />
</template>

<script lang="ts" setup>
  import { ButtonGroupOption } from '@prefecthq/prefect-design'
  import { useRowGridViewMode } from '@/utilities/useRowGridViewMode'

  const { activeViewMode } = useRowGridViewMode()

  const viewOptions: ButtonGroupOption[] = [
    { label: '', value: 'grid', icon: 'ViewGridIcon' },
    { label: '', value: 'rows', icon: 'ViewListIcon' },
  ]
</script>