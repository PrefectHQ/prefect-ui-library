<template>
  <p-content class="flows-table">
    <div class="flows-table__controls">
      <div class="flows-table__right">
        <ResultsCount v-if="selectedFlows.length == 0" label="Flow" :count="flowsCount" />
        <SelectedCount v-else :count="selectedFlows.length" />

        <DeleteFlowsButton v-if="can.delete.flow" :selected="selectedFlows" @delete="deleteFlows" />
      </div>


      <SearchInput v-model="name" placeholder="Search flows" label="Search flows" />
      <p-select v-model="sort" :options="flowSortOptions" />
    </div>

    <p-table :data="flows" :columns="columns">
      <template #selection-heading>
        <p-checkbox v-model="allFlowsSelected" :value="selectAllFlows()" />
      </template>

      <template #selection="{ row }">
        <p-checkbox v-model="selectedFlows" :value="row.id" />
      </template>

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
  import { computed, ref } from 'vue'
  import { DeleteFlowsButton, DeploymentsCount, ResultsCount, SearchInput, FlowActivityChart, FlowMenu, SelectedCount } from '@/components'
  import { useCan, UseFlowFilterArgs, useFlowFilterFromRoute, useWorkspaceApi } from '@/compositions'
  import { flowRouteKey } from '@/router'
  import { flowSortOptions } from '@/types/SortOptionTypes'
  import { inject } from '@/utilities'
  import { formatDateTimeNumeric } from '@/utilities/dates'

  const flowRoute = inject(flowRouteKey)

  const props = defineProps<{
    filter?: UseFlowFilterArgs,
  }>()

  const api = useWorkspaceApi()
  const can = useCan()
  const filter = computed(() => props.filter ?? {})
  const { name, sort, filter: unionFilter } = useFlowFilterFromRoute(filter)

  const columns = [
    {
      label: 'selection',
      width: '20px',
    },
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

  const allFlowsSelected = ref(false)
  const selectedFlows = ref<string[]>([])
  const selectAllFlows = (): string[] => {
    if (allFlowsSelected.value) {
      return selectedFlows.value = [...flows.value.map(flow => flow.id)]
    }
    return selectedFlows.value = []
  }

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

  const emit = defineEmits<{
    (event: 'delete-all'): void,
  }>()

  const deleteFlows = (): void => {
    selectedFlows.value = []
    allFlowsSelected.value = false
    refresh()
    emit('delete-all')
  }
</script>

<style>
.flows-table__right { @apply
  mr-auto
  flex
  gap-2
  items-center
}

.flows-table__controls { @apply
  flex
  gap-2
  items-stretch
  flex-col
  sm:flex-row
  sm:items-center
  sticky
  top-0
  bg-white
  bg-opacity-90
  py-2
  z-10
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
