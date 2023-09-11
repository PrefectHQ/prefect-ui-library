<template>
  <div class="flows-table">
    <p-layout-table :root-margin="margin" sticky>
      <template #header-start>
        <div class="flows-table__header-start">
          <ResultsCount v-if="selectedFlows.length == 0" label="Flow" :count="flowsCount" />
          <SelectedCount v-else :count="selectedFlows.length" />

          <FlowsDeleteButton v-if="can.delete.flow" :selected="selectedFlows" @delete="deleteFlows" />
        </div>
      </template>

      <template #header-end>
        <div class="flows-table__header-end">
          <SearchInput v-model="flowNameLike" placeholder="Search flows" label="Search flows" />
          <p-select v-model="filter.sort" :options="flowSortOptions" />
          <p-tags-input v-model="filter.flowRuns.tags.name" empty-message="Flow run tags" :options="options" class="flows-table__tags" />
        </div>
      </template>

      <p-table :data="flows" :columns="columns">
        <template #selection-heading>
          <p-checkbox v-model="model" @update:model-value="selectAllFlows" />
        </template>

        <template #selection="{ row }">
          <p-checkbox v-model="selectedFlows" :value="row.id" />
        </template>

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
            <template v-if="isCustomFilter" #actions>
              <p-button small @click="clear">
                Clear Filters
              </p-button>
            </template>
          </PEmptyResults>
        </template>
      </p-table>

      <template #footer-end>
        <p-pager v-if="pages > 1" v-model:page="page" :pages="pages" />
      </template>
    </p-layout-table>
  </div>
</template>

<script lang="ts" setup>
  import { PTable, PEmptyResults, PLink, CheckboxModel, TableColumn } from '@prefecthq/prefect-design'
  import { useDebouncedRef, useSubscription } from '@prefecthq/vue-compositions'
  import { computed, ref } from 'vue'
  import { FlowsDeleteButton, DeploymentsCount, ResultsCount, SearchInput, FlowActivityChart, SelectedCount } from '@/components'
  import { useCan, useFlowsFilterFromRoute, useWorkspaceApi, useWorkspaceRoutes, useFlowRuns, useOffsetStickyRootMargin, useFilterPagination } from '@/compositions'
  import { useComponent } from '@/compositions/useComponent'
  import { FlowsFilter } from '@/models/Filters'
  import { Flow } from '@/models/Flow'
  import { flowSortOptions } from '@/types/SortOptionTypes'
  import { formatDateTimeNumeric } from '@/utilities/dates'

  const props = defineProps<{
    filter?: FlowsFilter,
  }>()

  const { margin } = useOffsetStickyRootMargin()
  const { FlowMenu } = useComponent()

  const api = useWorkspaceApi()
  const can = useCan()
  const routes = useWorkspaceRoutes()

  const { page, limit, offset } = useFilterPagination()
  const pages = computed(() => Math.ceil((flowsCount.value ?? limit.value) / limit.value))
  const flowNameLike = ref<string>()
  const flowNameLikeDebounced = useDebouncedRef(flowNameLike, 1200)
  const { filter, clear, isCustomFilter } = useFlowsFilterFromRoute({
    ...props.filter,
    limit,
    offset,
    flows: {
      ...props.filter,
      nameLike: flowNameLikeDebounced,
    },
  })

  const columns: TableColumn<Flow>[] = [
    {
      label: 'selection',
      width: '20px',
      visible: can.delete.flow,
    },
    {
      property: 'name',
      label: 'Name',
      width: '125px',
    },
    {
      label: 'Deployments',
      width: '125px',
    },
    {
      property: 'created',
      label: 'Created',
      width: '125px',
    },
    {
      label: 'Activity',
      width: '200px',
    },
    {
      label: 'Action',
      width: '42px',
    },
  ]

  const selectedFlows = ref<string[]>([])
  const selectAllFlows = (allFlowsSelected: CheckboxModel): string[] => {
    if (allFlowsSelected) {
      return selectedFlows.value = [...flows.value.map(flow => flow.id)]
    }
    return selectedFlows.value = []
  }

  const model = computed({
    get() {
      return selectedFlows.value.length === flows.value.length
    },
    set(value: boolean) {
      selectAllFlows(value)
    },
  })

  const flowsSubscription = useSubscription(api.flows.getFlows, [filter])
  const flows = computed(() => flowsSubscription.response ?? [])

  const flowsCountSubscription = useSubscription(api.flows.getFlowsCount, [filter])
  const flowsCount = computed(() => flowsCountSubscription.response)

  const { flowRuns } = useFlowRuns({})
  const tagList = computed(() => flowRuns.value.flatMap(flowRun => flowRun.tags ?? []))
  const options = computed(() => [...new Set(tagList.value)])

  function refresh(): void {
    flowsSubscription.refresh()
    flowsCountSubscription.refresh()
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
.flows-table__header-start { @apply
  grow
  whitespace-nowrap
}

.flows-table__header-end { @apply
  flex
  flex-wrap
  pl-2
  ml-auto
  shrink
  gap-2
}

.flows-table__deployments,
.flows-table__tags {
  min-width: 128px;
}

.flows-table__activity-chart { @apply
  !h-12
}

.flows-table__action { @apply
  text-right
}
</style>
