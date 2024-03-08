<template>
  <p-content class="artifact-data-table">
    <p-list-header>
      <template #controls>
        <span class="artifact-data-table__results-count">
          <template v-if="filteredCount !== dataCount">
            <span class="artifact-data-table__count">{{ filteredCount }}</span> of
          </template>
          <span class="artifact-data-table__count">{{ dataCount }}</span>
          {{ toPluralString(localization.info.item, dataCount) }}
        </span>
        <SearchInput v-model="search" />
      </template>
    </p-list-header>

    <p-table :data="filteredData">
      <template #empty-state>
        <p-empty-results>
          <p-markdown-renderer :text="emptyDataText" />
        </p-empty-results>
      </template>

      <template v-for="key in columnKeys" #[kebabCase(key)]="{ row, column }" :key="key">
        <span class="artifact-data-table__cell">
          <template v-if="column.property && isString(row[column.property])">
            <p-markdown-renderer class="artifact-data-table__cell-renderer" :text="row[column.property]" />
          </template>
          <template v-else-if="column.property">
            {{ row[column.property] }}
          </template>
        </span>
      </template>
    </p-table>
  </p-content>
</template>

<script lang="ts" setup>
  import { TableData, kebabCase, toPluralString } from '@prefecthq/prefect-design'
  import { useDebouncedRef } from '@prefecthq/vue-compositions'
  import { computed, ref } from 'vue'
  import { SearchInput } from '@/components'
  import { localization } from '@/localization'
  import { TableArtifact } from '@/models'
  import { isTableArtifactData, isArrayOfMaps, isMapOfArrays } from '@/types/artifact'
  import { isString } from '@/utilities'
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

  const columnKeys = computed(() => {
    if (normalizedData.value.length === 0) {
      return []
    }

    return Object.keys(normalizedData.value[0])
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
  text-subdued
  text-sm
}

.artifact-data-table__count { @apply
  font-medium
}

.artifact-data-table__cell-renderer,
.artifact-data-table__cell { @apply
  text-sm
}
</style>