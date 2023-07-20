<template>
  <ComponentPage title="DashboardTimeSpanFilter">
    <TimeSpanFilter v-model:selected="selected" />
    <p-tabs v-model:selected="selected" :tabs="tabs" class="flow-run-state-type-tabs">
      <template #heading="{ tab }">
        <FlowRunStateTypeCount :state-type="getTabStates(tab.label)" :filter="getStateTypeFilter(tab.label)" />
      </template>
      <template #content="{ tab }">
        <p-content>
          <FlowRunList :flow-runs="getFlowRuns(tab.label)" class="color-mode-default" />
        </p-content>
      </template>
    </p-tabs>
  </ComponentPage>
</template>


<script lang="ts" setup>
  import { secondsInDay } from 'date-fns'
  import { ref, computed } from 'vue'
  import { useRouteQueryParam } from '@prefecthq/vue-compositions'
  import FlowRunsAccordion from '@/components/FlowRunsAccordion.vue'
  import FlowRunStateTypeCount from '@/components/FlowRunStateTypeCount.vue'
  import FlowRunStateTypeTabDescription from '@/components/FlowRunStateTypeTabDescription.vue'
  import TimeSpanFilter from '@/components/TimeSpanFilter.vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'
  import { useFlowRunsCount } from '@/compositions'
  import { FlowRunsFilter } from '@/models/Filters'
  import { StateType } from '@/models/StateType'
  import FlowRunList from '@/components/FlowRunList.vue'
  import { useFlowRunsMock } from '@/demo/compositions/useFlowRunsMock'

  const selected = ref(secondsInDay)

  const props = defineProps<{
    filter?: FlowRunsFilter,
  }>()

  const tabStates: Record<string, StateType[]> = {
    failed: ['failed', 'crashed'],
    running: ['running', 'pending', 'cancelling'],
    completed: ['completed'],
    scheduled: ['scheduled', 'paused'],
    cancelled: ['cancelled'],
  }

  const { count: cancelledCount } = useFlowRunsCount(getStateTypeFilter('cancelled'))

  const tabs = computed(() => {
    const tabNames = Object.keys(tabStates)

    if (!cancelledCount.value || cancelledCount.value < 1) {
      tabNames.filter(value => value !== 'cancelled')
    }

    return tabNames
  })

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

function getFlowRuns(tab: string) {
  // Retrieve the flow runs data
  const flowRunsData = useFlowRunsMock(7);

  // Get the StateType array corresponding to the selected tab
  const stateTypesForTab = getTabStates(tab);

  // Filter flow runs based on their state type matching the selected tab
  const filteredFlowRuns = flowRunsData.filter((flowRun) => {
    return stateTypesForTab.includes(flowRun.state.type);
  });

  return filteredFlowRuns;
}


</script>

<style>
.flow-run-state-type-tabs .p-tab {
  @apply flex-grow flex items-center justify-center;
}
</style>