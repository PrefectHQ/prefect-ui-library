<template>
  <p-content class="flows-table">
    <div class="flows-table__controls">
      <ResultsCount class="flows-table__count" label="Flow" :count="flowsCount" />
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
  import { useDebouncedRef, useSubscription } from '@prefecthq/vue-compositions'
  import { computed, ref } from 'vue'
  import ResultsCount from './ResultsCount.vue'
  import SearchInput from './SearchInput.vue'
  import FlowActivityChart from '@/components/FlowActivityChart.vue'
  import FlowMenu from '@/components/FlowMenu.vue'
  import { useFilter, UseFilterArgs, useWorkspaceApi } from '@/compositions'
  import { flowRouteKey } from '@/router'
  import { FlowRunSortValues } from '@/types/SortOptionTypes'
  import { inject } from '@/utilities'

  const flowRoute = inject(flowRouteKey)

  const props = defineProps<{
    filter?: Omit<UseFilterArgs, 'flowName' | 'sort'>,
  }>()

  const emits = defineEmits<{
    (event: 'delete', value: string): void,
  }>()

  const api = useWorkspaceApi()
  const searchTerm = ref('')
  const searchTermDebounced = useDebouncedRef(searchTerm, 500)
  const sort = ref<FlowRunSortValues>('CREATED_DESC')

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

  const internalFilters = computed<UseFilterArgs>(() => {
    const unionFilters: UseFilterArgs = { ...props.filter }

    if (searchTermDebounced.value.length) {
      unionFilters.flowName = searchTermDebounced
    }

    unionFilters.sort = sort

    return unionFilters
  })

  const unionFilter = useFilter(internalFilters)
  const flowsSubscription = useSubscription(api.flows.getFlows, [unionFilter])
  const flows = computed(() => flowsSubscription.response ?? [])

  const flowsCountSubscription = useSubscription(api.flows.getFlowsCount, [unionFilter])
  const flowsCount = computed(() => flowsCountSubscription.response)

  function clear(): void {
    searchTerm.value = ''
  }
</script>

<style>
.flows-table__count { @apply
  mr-auto
}

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

.flows-table__activity-chart { @apply
  h-12
}

.flows-table__action { @apply
  text-right
}
</style>
