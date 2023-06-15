<template>
  <p-tabs v-model:selected="selected" :tabs="tabs" class="flow-run-state-type-tabs">
    <template #heading="{ tab }">
      <template v-if="tab">
        <FlowRunStateTypeCount :state-type="getTabStates(tab.label)" :filter="filter" />
      </template>
    </template>
    <template #content="{ tab }">
      <FlowRunsAccordion :filter="getStateTypeFilter(tab.label)" />
    </template>
  </p-tabs>
</template>

<script lang="ts" setup>
  import { useRouteQueryParam } from '@prefecthq/vue-compositions'
  import FlowRunsAccordion from '@/components/FlowRunsAccordion.vue'
  import FlowRunStateTypeCount from '@/components/FlowRunStateTypeCount.vue'
  import { FlowRunsFilter } from '@/models/Filters'
  import { StateType } from '@/models/StateType'

  const props = defineProps<{
    filter?: FlowRunsFilter,
  }>()

  const tabStates: Record<string, StateType[]> = {
    failed: ['failed', 'crashed'],
    running: ['running'],
    completed: ['completed'],
    scheduled: ['scheduled'],
  }
  const tabs = Object.keys(tabStates)

  const selected = useRouteQueryParam('flow-run-state', 'failed')

  function getTabStates(tab: string): StateType[] {
    return tabStates[tab]
  }

  function getStateTypeFilter(tab: string): FlowRunsFilter {
    const types = getTabStates(tab)

    return {
      ...props.filter,
      flowRuns: {
        ...props.filter?.flowRuns,
        state: {
          ...props.filter?.flowRuns?.state,
          type: types,
        },
      },
      sort: 'EXPECTED_START_TIME_DESC',
    }
  }
</script>

<style>
.flow-run-state-type-tabs .p-tab-navigation { @apply
  grid
  grid-cols-4
}

.flow-run-state-type-tabs .p-tab { @apply
  flex
  items-center
  justify-center
}
</style>