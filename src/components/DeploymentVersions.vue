<template>
  <h1>Deployments Versions!!!</h1>
  <div class="deployment-parameters-table">
    <div class="deployment-parameters-table__search">
      <ResultsCount :count="filtered.length" label="versions" />
      <SearchInput v-model="searchTerm" placeholder="Search versions" label="Search versions" />
    </div>

    <p-table :data="filtered" :columns="columns">
      <template #empty-state>
        <PEmptyResults>
          <template v-if="searchTerm.length" #actions>
            <p-button size="sm" @click="clear">
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


  type Version = {
    id: string,
    deployment_id: string,
  }

  const props = defineProps<{
    versions: Version[],
  }>()


  const columns: TableColumn<Version>[] = [
    { label: 'ID', property: 'id' },
    { label: 'Deployment ID', property: 'deployment_id' },
  ]

  const searchTerm = ref('')

  const filtered = computed(() => {
    if (searchTerm.value.length === 0) {
      return props.versions
    }

    return props.versions.filter(filterVersion)
  })

  function filterVersion({ id, deployment_id }: Version): boolean {
    return `${id} ${deployment_id}`.toLowerCase().includes(searchTerm.value.toLowerCase())
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