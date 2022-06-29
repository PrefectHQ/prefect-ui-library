<template>
  <div class="flows-table">
    <div class="flows-table__search">
      <ResultsCount label="Flow" :count="filtered.length" />
      <SearchInput v-model="searchTerm" placeholder="Search flows" label="Search flows" />
    </div>

    <p-table :data="filtered" :columns="columns">
      <template #name="{ row }">
        <p-link :to="flowRoute(row.id)">
          <span>{{ row.name }}</span>
        </p-link>
      </template>

      <template #activity="{ row }">
        <FlowActivityChart :flow="row" class="flows-table__activity-chart" />
      </template>

      <template #action-heading>
        <span />
      </template>

      <template #action="{ row }">
        <FlowMenu :flow="row" @delete="id => emits('delete', id)" />
      </template>

      <template #empty-state>
        <PEmptyResults>
          <template #message>
            No flows
          </template>
          <template #actions>
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
  import { PTable, PTagWrapper, PEmptyResults, PLink } from '@prefecthq/prefect-design'
  import { computed, ref } from 'vue'
  import ResultsCount from './ResultsCount.vue'
  import SearchInput from './SearchInput.vue'
  import FlowActivityChart from '@/components/FlowActivityChart.vue'
  import FlowMenu from '@/components/FlowMenu.vue'
  import { Flow } from '@/models'
  import { flowRouteKey } from '@/router'
  import { inject } from '@/utilities'

  const flowRoute = inject(flowRouteKey)

  const props = defineProps<{
    flows: Flow[],
  }>()

  const emits = defineEmits<{
    (event: 'delete', value: string): void,
  }>()

  const searchTerm = ref('')

  const columns = [
    {
      property: 'name',
      label: 'Name',
      width: '150px',
    },
    {
      property: 'activity',
      label: 'Activity',
      width: '200px',
    },
    {
      label: 'Action',
      width: '42px',
    },
  ]

  const filtered = computed(() => {
    if (searchTerm.value.length === 0) {
      return props.flows
    }

    return props.flows.filter(filterFlows)
  })

  function filterFlows({ name }: Flow): boolean {
    return name.toLowerCase().includes(searchTerm.value.toLowerCase())
  }

  function clear(): void {
    searchTerm.value = ''
  }
</script>

<style>
.flows-table__search { @apply
  flex
  justify-between
  items-center
  mb-4
}

.flows-table__activity-chart {
  @apply
  h-12
}
</style>
