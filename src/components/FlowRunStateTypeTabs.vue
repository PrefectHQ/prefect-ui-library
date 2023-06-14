<template>
  <p-tabs v-model:selected="selected" :tabs="tabs" class="flow-run-state-type-tabs">
    <template #heading="{ tab }">
      <template v-if="tab && isStateType(tab.label)">
        <FlowRunStateTypeCount :state-type="tab.label" :filter="filter" />
      </template>
    </template>
    <template #content="{ tab }">
      <template v-if="isStateType(tab.label)">
        <FlowRunsAccordion :filter="getStateTypeFilter(tab.label)" />
      </template>
    </template>
  </p-tabs>
</template>

<script lang="ts" setup>
  import { useRouteQueryParam } from '@prefecthq/vue-compositions'
  import FlowRunsAccordion from '@/components/FlowRunsAccordion.vue'
  import FlowRunStateTypeCount from '@/components/FlowRunStateTypeCount.vue'
  import { FlowRunsFilter } from '@/models/Filters'
  import { StateType, isStateType } from '@/models/StateType'

  const props = defineProps<{
    filter?: FlowRunsFilter,
  }>()

  const tabs: StateType[] = ['failed', 'running', 'completed', 'scheduled']
  const selected = useRouteQueryParam('flow-run-state', 'failed')

  function getStateTypeFilter(type: StateType): FlowRunsFilter {
    return {
      ...props.filter,
      flowRuns: {
        ...props.filter?.flowRuns,
        state: {
          ...props.filter?.flowRuns?.state,
          type: [type],
        },
      },
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