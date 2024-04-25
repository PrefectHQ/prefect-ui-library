<template>
  <p-content class="flow-list">
    <p-list-header sticky>
      <ResultsCount v-if="selectedFlows.length == 0" label="Flow" :count="total" />
      <SelectedCount v-else :count="selectedFlows.length" />
      <FlowsDeleteButton v-if="can.delete.flow" :selected="selectedFlows.map(flow => flow.id)" size="sm" @delete="deleteFlows" />

      <template #controls>
        <SearchInput v-model="flowNameLike" placeholder="Flow names" label="Search flows" />
        <FlowRunTagsInput v-model:selected="filter.flowRuns.tags.name" multiple />
      </template>

      <template #sort>
        <p-select v-model="filter.sort" :options="flowSortOptions" />
      </template>
    </p-list-header>

    <p-table
      :selected="can.delete.flow ? selectedFlows : undefined"
      :data="flows"
      :columns="columns"
      :column-classes="columnClasses"
      class="flow-list__table"
      @update:selected="selectedFlows = $event"
    >
      <template #name="{ row }">
        <div class="flow-list__name-col">
          <p-link :to="routes.flow(row.id)" class="flow-list__name">
            <span>{{ row.name }}</span>
          </p-link>
          <span class="flow-list__created-date">Created {{ formatDateTimeNumeric(row.created) }}</span>
        </div>
      </template>

      <template #last-run="{ row }">
        <LastFlowRun :flow-id="row.id" />
      </template>

      <template #next-run="{ row }">
        <NextFlowRun :flow-id="row.id" />
      </template>

      <template #deployments="{ row }">
        <DeploymentsCount :flow-id="row.id" class="flow-list__deployment-count" />
      </template>

      <template #activity="{ row }">
        <MiniFlowHistory
          class="flow-list__activity-chart"
          :flow-id="row.id"
          :time-span-in-seconds="secondsInDay"
        />
      </template>

      <template #action-heading>
        <span />
      </template>

      <template #action="{ row }">
        <div class="flow-list__action">
          <FlowMenu size="xs" :flow="row" flat @delete="refresh" />
        </div>
      </template>

      <template #empty-state>
        <PEmptyResults v-if="subscriptions.executed">
          <template #message>
            No flows
          </template>
          <template v-if="isCustomFilter" #actions>
            <p-button size="sm" @click="clear">
              Clear Filters
            </p-button>
          </template>
        </PEmptyResults>
        <PEmptyResults v-else>
          <template #message>
            Loading...
          </template>
        </PEmptyResults>
      </template>
    </p-table>

    <p-pager v-if="pages > 1" v-model:page="page" :pages="pages" />
  </p-content>
</template>

<script lang="ts" setup>
  import { ColumnClassesMethod, TableColumn } from '@prefecthq/prefect-design'
  import { NumberRouteParam, useDebouncedRef, useRouteQueryParam } from '@prefecthq/vue-compositions'
  import { secondsInDay } from 'date-fns/constants'
  import merge from 'lodash.merge'
  import { ref } from 'vue'
  import {
    FlowsDeleteButton,
    LastFlowRun,
    NextFlowRun,
    DeploymentsCount,
    ResultsCount,
    SearchInput,
    MiniFlowHistory,
    SelectedCount,
    FlowRunTagsInput
  } from '@/components'
  import { useCan, useFlowsFilterFromRoute, useWorkspaceRoutes, useFlows } from '@/compositions'
  import { useComponent } from '@/compositions/useComponent'
  import { FlowsFilter } from '@/models/Filters'
  import { Flow } from '@/models/Flow'
  import { flowSortOptions } from '@/types/SortOptionTypes'
  import { snakeCase } from '@/utilities'
  import { formatDateTimeNumeric } from '@/utilities/dates'

  const props = defineProps<{
    filter?: FlowsFilter,
  }>()

  const { FlowMenu } = useComponent()

  const can = useCan()
  const routes = useWorkspaceRoutes()

  const flowNameLike = ref<string>()
  const flowNameLikeDebounced = useDebouncedRef(flowNameLike, 1200)
  const { filter, clear, isCustomFilter } = useFlowsFilterFromRoute(merge({}, props.filter, {
    flows: {
      nameLike: flowNameLikeDebounced,
    },
    limit: 50,
  }))

  const page = useRouteQueryParam('page', NumberRouteParam, 1)
  const { flows, subscriptions, total, pages } = useFlows(filter, {
    page,
    interval: 30000,
  })

  const columns: TableColumn<Flow>[] = [
    {
      property: 'name',
      label: 'Name',
    },
    {
      label: 'Last run',
    },
    {
      label: 'Next run',
    },
    {
      label: 'Deployments',
    },
    {
      label: 'Activity',
    },
    {
      label: 'Action',
    },
  ]

  const columnClasses: ColumnClassesMethod = (column) => {
    return [`flow-list__${snakeCase(column.label)}-column`]
  }

  const selectedFlows = ref<Flow[]>([])

  function refresh(): void {
    subscriptions.refresh()
  }

  const emit = defineEmits<{
    (event: 'delete'): void,
  }>()

  const deleteFlows = (): void => {
    selectedFlows.value = []
    refresh()
    emit('delete')
  }
</script>

<style>
.flow-list__table .p-table-data { @apply
  whitespace-normal
}

.flow-list__latest-runs-chart { @apply
  h-12
  w-20
}

.flow-list__action { @apply
  text-right
}

.flow-list__name-col { @apply
  flex
  flex-col
}

.flow-list__activity-column { @apply
  overflow-visible
}

.flow-list__name { @apply
  font-medium
}

.flow-list__created-date { @apply
  text-subdued
  text-xs
}

.flow-list__deployment-count { @apply
  whitespace-nowrap
}
</style>
