<template>
  <p-content class="flow-list">
    <p-list-header sticky>
      <ResultsCount v-if="selectedFlows.length == 0" label="Flow" :count />
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
      :row-key="(flow: Flow) => flow.id"
      class="flow-list__table"
      @update:selected="selectedFlows = $event"
    >
      <template #name="{ row }">
        <div class="flow-list__name-col">
          <p-link :to="routes.flow(row.id)" class="flow-list__name">
            <span>{{ row.name }}</span>
          </p-link>

          <FormattedDate :date="row.created" format="numeric">
            <template #default="{ date }">
              <span class="flow-list__created-date">Created {{ date }}</span>
            </template>
          </FormattedDate>
        </div>
      </template>

      <template #last-run="{ row }">
        <LastFlowRun :flow-id="row.id" />
      </template>

      <template #next-run="{ row }">
        <NextFlowRun :flow-id="row.id" />
      </template>

      <template #deployments="{ row }">
        <DeploymentsCount :count="getDeploymentsCount(row.id)" :flow-id="row.id" class="flow-list__deployment-count" />
      </template>

      <template #activity="{ row }">
        <MiniFlowHistory
          class="flow-list__activity-chart"
          :flow-id="row.id"
          :time-span-in-seconds="-secondsInWeek"
        />
      </template>

      <template #action-heading>
        <span />
      </template>

      <template #action="{ row }">
        <div class="flow-list__action">
          <FlowMenu size="xs" :flow="row" flat @delete="refresh(row.id)" />
        </div>
      </template>

      <template #empty-state>
        <p-empty-results v-if="subscription.executed">
          <template #message>
            No flows
          </template>
          <template v-if="isCustomFilter" #actions>
            <p-button size="sm" @click="clear">
              Clear Filters
            </p-button>
          </template>
        </p-empty-results>

        <p-empty-results v-else>
          <template #message>
            <p-loading-icon />
          </template>
        </p-empty-results>
      </template>
    </p-table>

    <p-pager v-model:page="page" v-model:limit="limit" :pages="pages" />
  </p-content>
</template>

<script lang="ts" setup>
  import { ColumnClassesMethod, TableColumn } from '@prefecthq/prefect-design'
  import { NumberRouteParam, useDebouncedRef, useLocalStorage, useRouteQueryParam, useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
  import { secondsInWeek } from 'date-fns/constants'
  import merge from 'lodash.merge'
  import { computed, ref, toRef } from 'vue'
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
  import FormattedDate from '@/components/FormattedDate.vue'
  import { useCan, useWorkspaceRoutes, useFlows, useWorkspaceApi, useFlowsPaginationFilterFromRoute } from '@/compositions'
  import { useComponent } from '@/compositions/useComponent'
  import { FlowsFilter } from '@/models/Filters'
  import { Flow } from '@/models/Flow'
  import { Getter } from '@/types'
  import { flowSortOptions } from '@/types/SortOptionTypes'
  import { snakeCase } from '@/utilities'

  const props = defineProps<{
    filter?: FlowsFilter,
  }>()

  const { FlowMenu } = useComponent()

  const api = useWorkspaceApi()
  const can = useCan()
  const routes = useWorkspaceRoutes()

  const { value: limit } = useLocalStorage('flow-list-limit', 10)
  const page = useRouteQueryParam('page', NumberRouteParam, 1)
  const flowNameLike = ref<string>()
  const flowNameLikeDebounced = useDebouncedRef(flowNameLike, 1200)

  const { filter, clear, isCustomFilter } = useFlowsPaginationFilterFromRoute(merge({}, props.filter, {
    flows: {
      nameLike: flowNameLikeDebounced,
    },
    limit,
    page,
  }))

  const { flows, subscription, count, pages } = useFlows(filter, {
    interval: 30000,
  })

  const deploymentsCountsSubscriptionGetter: Getter<[string[]] | null> = () => {
    if (flows.value.length > 0) {
      return [flows.value.map(flow => flow.id)]
    }

    return null
  }
  const deploymentsCountsSubscriptionArgs = toRef(deploymentsCountsSubscriptionGetter)
  const deploymentsCountsSubscription = useSubscriptionWithDependencies(api.ui.getDeploymentsCountByFlow, deploymentsCountsSubscriptionArgs)
  const deploymentsCounts = computed(() => deploymentsCountsSubscription.response)

  function getDeploymentsCount(flowId: string): number {
    return deploymentsCounts.value?.[flowId] ?? 0
  }

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

  function refresh(flowId?: string): void {
    if (flowId) {
      selectedFlows.value = selectedFlows.value.filter(flow => flow.id !== flowId)
    }
 subscription.refresh()
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
