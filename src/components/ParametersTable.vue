<template>
  <div class="deployment-parameters-table">
    <div class="deployment-parameters-table__search">
      <ResultsCount :count="filtered.length" label="parameters" />
      <SearchInput v-model="searchTerm" placeholder="Search parameters" label="Search parameters" />
    </div>

    <p-table :data="filtered" :columns="columns">
      <template #empty-state>
        <PEmptyResults>
          <template v-if="searchTerm.length" #actions>
            <p-button size="sm" secondary @click="clear">
              Clear Filters
            </p-button>
          </template>
        </PEmptyResults>
      </template>
    </p-table>
  </div>
</template>

<script lang="ts" setup>
  import { TableColumn, PEmptyResults } from '@prefecthq/prefect-design'
  import { computed, ref } from 'vue'
  import ResultsCount from '@/components/ResultsCount.vue'
  import SearchInput from '@/components/SearchInput.vue'
  import { Deployment } from '@/models'
  import { schemaPropertyServiceFactory } from '@/services/schemas'

  const props = defineProps<{
    deployment: Deployment,
  }>()

  const columns: TableColumn[] = [
    { label: 'Key', property: 'key', width: '200px' },
    { label: 'Override', property: 'value' },
    { label: 'Default', property: 'defaultValue' },
    { label: 'Type', property: 'type', width: '80px' },
  ]

  const searchTerm = ref('')

  const properties = computed(() => props.deployment.parameterOpenApiSchema.properties ?? {})

  const data = computed(() => {
    return Object.entries(properties.value)
      .map(([key, value]) => {
        const service = schemaPropertyServiceFactory(value!, 0)
        const mapped = service.mapRequestValue(props.deployment.parameters[key])

        return {
          key,
          value: mapped,
          defaultValue: value!.default,
          type: value!.type,
          position: value?.position ?? 0,
        }
      })
      .sort((propA, propB) => propA.position - propB.position)
  })

  const filtered = computed(() => {
    if (searchTerm.value.length === 0) {
      return data.value
    }

    return data.value.filter(filterParameter)
  })

  function filterParameter({ key, value, defaultValue, type }: { key: string, value: unknown, defaultValue: unknown, type?: string }): boolean {
    return `${key} ${value} ${defaultValue} ${type}`.toLowerCase().includes(searchTerm.value.toLowerCase())
  }

  function clear(): void {
    searchTerm.value = ''
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