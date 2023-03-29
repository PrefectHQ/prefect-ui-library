<template>
  <p-layout-table class="artifact-data-table">
    <template #header-end>
      <span class="artifact-data-table__results-count">
        <template v-if="filteredCount !== dataCount">
          <span class="artifact-data-table__count">{{ filteredCount }}</span> of
        </template>
        <span class="artifact-data-table__count">{{ dataCount }}</span>
        {{ toPluralString(localization.info.item, dataCount) }}
      </span>
      <SearchInput v-model="search" />
    </template>

    <p-table :data="filteredData" />
  </p-layout-table>
</template>

<script lang="ts" setup>
  import { TableData, toPluralString } from '@prefecthq/prefect-design'
  import { useDebouncedRef } from '@prefecthq/vue-compositions'
  import { computed, ref } from 'vue'
  import { SearchInput } from '@/components'
  import { localization } from '@/localization'
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

  const dataCount = computed(() => data.value.length)
  const filteredCount = computed(() => filteredData.value.length)
</script>

<style>
.artifact-data-table { @apply
  max-w-full
}

.artifact-data-table__results-count { @apply
  text-foreground-300
  text-sm
}

.artifact-data-table__count { @apply
  font-medium
}
</style>