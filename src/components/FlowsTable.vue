<template>
  <p-content class="flows-table">
    <div class="flows-table__controls">
      <ResultsCount class="flows-table__count" label="Flow" :count="flowsCount" />
      <SearchInput v-model="name" placeholder="Search flows" label="Search flows" />

      <p-select v-model="sort" :options="flowSortOptions" />
    </div>

    <p-table :data="flows" :columns="columns">
      <template #name="{ row }">
        <p-link :to="routes.flow(row.id)">
          <span>{{ row.name }}</span>
        </p-link>
      </template>

      <template #deployments="{ row }">
        <DeploymentsCount :flow-id="row.id" />
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
          <FlowMenu size="xs" :flow="row" @delete="refresh" />
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
  import { PTable, PEmptyResults, PLink } from '@prefecthq/prefect-design'
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import DeploymentsCount from './DeploymentsCount.vue'
  import ResultsCount from './ResultsCount.vue'
  import SearchInput from './SearchInput.vue'
  import FlowActivityChart from '@/components/FlowActivityChart.vue'
  import FlowMenu from '@/components/FlowMenu.vue'
  import { UseFlowFilterArgs, useFlowFilterFromRoute, useWorkspaceApi, useWorkspaceRoutes } from '@/compositions'
  import { flowSortOptions } from '@/types/SortOptionTypes'
  import { formatDateTimeNumeric } from '@/utilities/dates'

  const props = defineProps<{
    filter?: UseFlowFilterArgs,
  }>()

  const api = useWorkspaceApi()
  const routes = useWorkspaceRoutes()
  const filter = computed(() => props.filter ?? {})
  const { name, sort, filter: unionFilter } = useFlowFilterFromRoute(filter)

  const columns = [
    {
      property: 'name',
      label: 'Name',
      width: '125px',
    },
    {
      property: 'deployments',
      label: 'Deployments',
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

  const flowsSubscription = useSubscription(api.flows.getFlows, [unionFilter])
  const flows = computed(() => flowsSubscription.response ?? [])

  const flowsCountSubscription = useSubscription(api.flows.getFlowsCount, [unionFilter])
  const flowsCount = computed(() => flowsCountSubscription.response)

  function refresh(): void {
    flowsSubscription.refresh()
    flowsCountSubscription.refresh()
  }

  function clear(): void {
    name.value = ''
  }
</script>

<style>
.flows-table__count { @apply
  mr-auto
}

.flows-table__controls { @apply
  flex
  gap-2
  items-stretch
  flex-col
  sm:flex-row
  sm:items-center
}

.flows-table__search { @apply
  flex
  justify-between
  items-center
  mb-4
}

.flows-table__deployments {
  min-width: 128px;
}

.flows-table__activity-chart { @apply
  h-12
}

.flows-table__action { @apply
  text-right
}
</style>
