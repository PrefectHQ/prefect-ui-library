<template>
  <p-layout-table>
    <template #header-end>
      <SearchInput v-model="search" />
    </template>

    <p-table :data="filteredData" />
  </p-layout-table>
</template>

<script lang="ts" setup>
  import { TableData } from '@prefecthq/prefect-design'
  import { useDebouncedRef } from '@prefecthq/vue-compositions'
  import { computed, ref } from 'vue'
  import { SearchInput } from '..'
  import { TableArtifact } from '@/models'

  const props = defineProps<{
    artifact: TableArtifact,
  }>()

  const data = computed<TableData[]>(() => props.artifact.data)

  const search = ref('')
  const searchDebounced = useDebouncedRef(search, 250)

  const filteredData = computed<TableData[]>(() => {
    if (!searchDebounced.value) {
      return data.value
    }

    const correctedSearch = searchDebounced.value.toLowerCase()
    return data.value.filter((row) => {
      const correctedJoinedValues = Object.values(row).join(' ').toLowerCase()
      return correctedJoinedValues.includes(correctedSearch)
    })
  })
</script>

<style>
.artifact-data-table { @apply
  max-w-full
  overflow-auto
}
</style>