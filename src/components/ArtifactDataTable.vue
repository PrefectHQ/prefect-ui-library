<template>
  <p-table :data="data">
    <!-- hello! -->
  </p-table>
</template>

<script lang="ts" setup>
  import { TableData } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import { TableArtifact } from '@/models'

  const props = defineProps<{
    artifact: TableArtifact,
  }>()

  const data = computed<TableData[]>(() => props.artifact.data)
</script>

<style>
.artifact-data-table { @apply
  max-w-full
  overflow-auto
}
</style>