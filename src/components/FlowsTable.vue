<template>
  <p-content class="flows-table">
    <div class="flows-table__controls">
      <ResultsCount class="flows-table__count" label="Flow" :count="flowsCount" />
      <SearchInput v-model="name" placeholder="Search flows" label="Search flows" />

      <template v-if="canFilterDeployments">
        <DeploymentCombobox v-model:selected="deployments" empty-message="All deployments" class="flows-table__deployments" />
      </template>

      <p-select v-model="sort" :options="flowSortOptions" />
    </div>

    <p-table :data="flows" :columns="columns">
      <template #name="{ row }">
        <p-link :to="flowRoute(row.id)">
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
  import { computed, unref } from 'vue'
  import DeploymentCombobox from './DeploymentCombobox.vue'
  import DeploymentsCount from './DeploymentsCount.vue'
  import ResultsCount from './ResultsCount.vue'
  import SearchInput from './SearchInput.vue'
  import FlowActivityChart from '@/components/FlowActivityChart.vue'
  import FlowMenu from '@/components/FlowMenu.vue'
  import { UseFlowFilterArgs, useFlowFilterFromRoute, useWorkspaceApi } from '@/compositions'
  import { flowRouteKey } from '@/router'
  import { flowSortOptions } from '@/types/SortOptionTypes'
  import { inject } from '@/utilities'
  import { formatDateTimeNumeric } from '@/utilities/dates'

  const flowRoute = inject(flowRouteKey)

  const props = defineProps<{
    filter?: UseFlowFilterArgs,
  }>()

  const api = useWorkspaceApi()
  const filter = computed(() => props.filter ?? {})
  const { deployments, name, sort, filter: unionFilter } = useFlowFilterFromRoute(filter)

  const canFilterDeployments = computed(() => {
    const filterHasDeployments = !!unref(filter.value.deployments)?.length
    const filterHasDeploymentName = !!unref(filter.value.deploymentName)?.length

    return !filterHasDeployments && !filterHasDeploymentName
  })

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
