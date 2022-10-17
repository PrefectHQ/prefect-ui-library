<template>
  <p-content class="flows-table">
    <div class="flows-table__controls">
      <ResultsCount class="flows-table__count" label="Flow" :count="flowsCount" />
      <SearchInput v-model="flowName" placeholder="Search flows" label="Search flows" />
      <DeploymentCombobox v-model:selected="deployments" empty-message="All deployments" class="flows-table__deployments" />
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
  import { useDebouncedRef, useRouteQueryParam, useSubscription } from '@prefecthq/vue-compositions'
  import { computed, onUnmounted } from 'vue'
  import { onBeforeRouteLeave } from 'vue-router'
  import DeploymentCombobox from './DeploymentCombobox.vue'
  import ResultsCount from './ResultsCount.vue'
  import SearchInput from './SearchInput.vue'
  import FlowActivityChart from '@/components/FlowActivityChart.vue'
  import FlowMenu from '@/components/FlowMenu.vue'
  import { useFilter, UseFlowFilterArgs, useWorkspaceApi } from '@/compositions'
  import { flowRouteKey } from '@/router'
  import { isFlowSortValue } from '@/types'
  import { inject } from '@/utilities'

  const flowRoute = inject(flowRouteKey)

  const props = defineProps<{
    filter?: Omit<UseFlowFilterArgs, 'flowName' | 'sort'>,
  }>()

  const emits = defineEmits<{
    (event: 'delete', value: string): void,
  }>()

  const api = useWorkspaceApi()
  const flowName = useRouteQueryParam('search', '')
  const flowNameDebounced = useDebouncedRef(flowName, 500)
  const deployments = useRouteQueryParam('deployments', [])
  const sort = useRouteQueryParam('sort', 'CREATED_DESC')

  onUnmounted(() => console.log('unmounted'))
  onBeforeRouteLeave(() => console.log('before route leave'))

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

  const internalFilters = computed<UseFlowFilterArgs>(() => {
    const filter: UseFlowFilterArgs = { ...props.filter }

    if (flowNameDebounced.value.length) {
      filter.flowName = flowNameDebounced
    }

    if (deployments.value.length) {
      filter.deployments = deployments
    }

    if (isFlowSortValue(sort)) {
      filter.sort = sort
    }

    return filter
  })

  const unionFilter = useFilter(internalFilters)
  const flowsSubscription = useSubscription(api.flows.getFlows, [unionFilter])
  const flows = computed(() => flowsSubscription.response ?? [])

  const flowsCountSubscription = useSubscription(api.flows.getFlowsCount, [unionFilter])
  const flowsCount = computed(() => flowsCountSubscription.response)

  function clear(): void {
    flowName.value = ''
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
