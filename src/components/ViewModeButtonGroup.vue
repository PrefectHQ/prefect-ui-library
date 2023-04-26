<template>
  <p-button-group v-model="activeViewMode" :options="viewOptions" />
</template>

<script lang="ts" setup>
  import { ButtonGroupOption } from '@prefecthq/prefect-design'
  import { activeViewMode } from '@/utilities/activeViewMode'

  const viewOptions: ButtonGroupOption[] = [
    { label: '', value: 'grid', icon: 'Squares2X2Icon' },
    { label: '', value: 'rows', icon: 'Bars4Icon' },
  ]
</script>