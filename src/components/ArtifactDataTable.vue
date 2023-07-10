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

    <p-table :data="filteredData">
      <template #empty-state>
        <p-empty-results>
          <p-markdown-renderer :text="emptyDataText" />
        </p-empty-results>
      </template>
    </p-table>
  </p-layout-table>
</template>

<script lang="ts" setup>
  import { TableData, toPluralString } from '@prefecthq/prefect-design'
  import { useDebouncedRef } from '@prefecthq/vue-compositions'
  import { computed, ref } from 'vue'
  import { SearchInput } from '@/components'
  import { localization } from '@/localization'
  import { TableArtifact } from '@/models'
  import { isTableArtifactData, isArrayOfMaps, isMapOfArrays } from '@/types/artifact'
  import { parseUnknownJson } from '@/utilities/parseUnknownJson'

  const props = defineProps<{
    artifact: TableArtifact,
  }>()

  const data = computed(() => parseUnknownJson(props.artifact.data))
  const isValid = computed(() => isTableArtifactData(props.artifact.data))

  const normalizedData = computed(() => {
    if (isArrayOfMaps(data.value)) {
      return data.value
    }

    if (isMapOfArrays(data.value)) {
      const normalized: TableData[] = []

      Object.entries(data.value).forEach(([key, values]) => {
        values.forEach((value, index) => {
          normalized[index] ??= {}
          normalized[index][key] = value
        })
      })

      return normalized
    }

    return []
  })

  const search = ref('')
  const searchDebounced = useDebouncedRef(search, 250)

  const filteredData = computed<TableData[]>(() => {
    if (!searchDebounced.value) {
      return normalizedData.value
    }

    const correctedSearch = searchDebounced.value.toLowerCase()
    return normalizedData.value.filter((row) => {
      const correctedJoinedValues = Object.values(row).join(' ').toLowerCase()
      return correctedJoinedValues.includes(correctedSearch)
    })
  })

  const dataCount = computed(() => normalizedData.value.length)
  const filteredCount = computed(() => filteredData.value.length)

  const emptyDataText = computed(() => {
    if (!isValid.value) {
      return localization.info.invalidData(localization.docs.artifacts)
    }

    return localization.info.noData
  })
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