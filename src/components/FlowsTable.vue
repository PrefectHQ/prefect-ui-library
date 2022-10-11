<template>
  <p-content class="flows-table">
    <div class="flows-table__controls">
      <!-- todo: get the count from the api -->
      <ResultsCount class="mr-auto" label="Flow" :count="flows.length" />
      <SearchInput v-model="searchTerm" placeholder="Search flows" label="Search flows" />
      <p-select v-model="sort" :options="flowSortOption" />
    </div>

    <p-table :data="flows" :columns="columns">
      <template #name="{ row }">
        <p-link :to="flowRoute(row.id)">
          <span>{{ row.name }}</span>
        </p-link>
      </template>

      <template #created="{ row }">
        {{ formatDateTimeNumeric(row.created) }}
      </template>

      <template #activity="{ row }">
        <FlowActivityChart :flow="row" class="flows-table__activity-chart" />
      </template>

      <template #action-heading>
        <span />
      </template>

      <template #action="{ row }">
        <div class="flows-table__action">
          <FlowMenu size="xs" :flow="row" @delete="id => emits('delete', id)" />
        </div>
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
  </p-content>
</template>

<script lang="ts" setup>
  import { PTable, PEmptyResults, PLink, formatDateTimeNumeric } from '@prefecthq/prefect-design'
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed, ref } from 'vue'
  import ResultsCount from './ResultsCount.vue'
  import SearchInput from './SearchInput.vue'
  import FlowActivityChart from '@/components/FlowActivityChart.vue'
  import FlowMenu from '@/components/FlowMenu.vue'
  import { useFilter, UseFilterArgs } from '@/compositions'
  import { flowRouteKey } from '@/router'
  import { flowsApiKey } from '@/services'
  import { inject } from '@/utilities'

  const flowRoute = inject(flowRouteKey)

  const props = defineProps<{
    filter?: Omit<UseFilterArgs, 'flowName'>,
  }>()

  const emits = defineEmits<{
    (event: 'delete', value: string): void,
  }>()

  const searchTerm = ref('')
  const sort = ref('CREATED_DESC')

  const columns = [
    {
      property: 'name',
      label: 'Name',
      width: '125px',
    },
    {
      property: 'created',
      label: 'Created',
      width: '125px',
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

  const flowSortOption = [
    { label: 'Created', value: 'CREATED_DESC' },
    { label: 'A to Z', value: 'NAME_ASC' },
    { label: 'Z to A', value: 'NAME_DESC' },
  ]

  const flowsApi = inject(flowsApiKey)
  const internalFilters = computed<UseFilterArgs>(() => {
    const unionFilters: UseFilterArgs = { ...props.filter }

    if (searchTerm.value.length) {
      unionFilters.flowName = searchTerm
    }

    unionFilters.sort = sort as any

    return unionFilters
  })

  const unionFilter = computed(() => useFilter(internalFilters.value).value)
  const flowsSubscription = useSubscription(flowsApi.getFlows, [unionFilter])
  const flows = computed(() => flowsSubscription.response ?? [])

  function clear(): void {
    searchTerm.value = ''
  }
</script>

<style>
.flows-table__controls { @apply
  flex
  gap-2
  items-center
  flex-col
  sm:flex-row
}

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

.flows-table__action {
  @apply
  text-right
}
</style>
