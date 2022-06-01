<template>
  <div class="deployment-parameters-table">
    <div class="deployment-parameters-table__search">
      <ResultsCount :count="filtered.length" />
      <SearchInput v-model="term" placeholder="Search" label="Search parameters" />
    </div>
    <p-table :data="filtered" :columns="columns">
      <template #empty-state>
        test
        <PEmptyResults />
      </template>
    </p-table>
  </div>
</template>

<script lang="ts" setup>
  import { formatDateTimeNumeric, TableColumn, PEmptyResults } from '@prefecthq/prefect-design'
  import { computed, ref } from 'vue'
  import ResultsCount from '@/components/ResultsCount.vue'
  import SearchInput from '@/components/SearchInput.vue'
  import { isDate } from '@/utilities/dates'
  import { capitalize } from '@/utilities/strings'

  const props = defineProps<{
    parameters: Record<string, unknown>,
  }>()

  const columns: TableColumn[] = [
    { label: 'Key', property: 'key', width: '200px' },
    { label: 'Value', property: 'value' },
    { label: 'Type', property: 'type', width: '80px' },
  ]

  const term = ref('')

  const data = computed(() => Object.entries(props.parameters).map(([key, value]) => ({
    key,
    value: formatParameterValue(value),
    type: formatParameterType(value),
  })))

  const filtered = computed(() => {
    if (term.value.length === 0) {
      return data.value
    }

    return data.value.filter(filterParameter)
  })

  function filterParameter({ key, value, type }: { key: string, value: unknown, type: string }): boolean {
    return `${key} ${value} ${type}`.toLowerCase().includes(term.value)
  }

  function formatParameterValue(value: unknown): string {
    if (typeof value === 'object' && value !== null) {
      if (isDate(value)) {
        return formatDateTimeNumeric(value)
      }

      return JSON.stringify(value)
    }

    return (value as any).toString()
  }

  function formatParameterType(value: unknown): string {
    const type = typeof value

    if (type === 'object') {
      if (isDate(value)) {
        return 'Date'
      }

      return 'JSON'
    }

    return capitalize(type)
  }
</script>

<style>
.deployment-parameters-table__search { @apply
  flex
  justify-between
  items-center
  mb-4
}
</style>