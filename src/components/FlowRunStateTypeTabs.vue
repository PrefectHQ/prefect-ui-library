<template>
  <p-tabs v-model:selected="selected" :tabs="tabs" class="flow-run-state-type-tabs">
    <template #heading="{ tab }">
      <template v-if="tab">
        <FlowRunStateTypeCount :state-type="getTabStates(tab.label)" :filter="getStateTypeFilterGetter(tab.label)" />
      </template>
    </template>
    <template #content="{ tab }">
      <p-content>
        <FlowRunStateTypeTabDescription :state-type="getTabStates(tab.label)" :filter="getStateTypeFilterGetter(tab.label)" />
        <FlowRunsAccordion :filter="getStateTypeFilterGetter(tab.label)" />
      </p-content>
    </template>
  </p-tabs>
</template>

<script lang="ts" setup>
  import { useRouteQueryParam } from '@prefecthq/vue-compositions'
  import merge from 'lodash.merge'
  import { computed, toValue } from 'vue'
  import FlowRunsAccordion from '@/components/FlowRunsAccordion.vue'
  import FlowRunStateTypeCount from '@/components/FlowRunStateTypeCount.vue'
  import FlowRunStateTypeTabDescription from '@/components/FlowRunStateTypeTabDescription.vue'
  import { useFlowRunsCount } from '@/compositions'
  import { FlowRunsFilter } from '@/models/Filters'
  import { StateType } from '@/models/StateType'
  import { Getter, MaybeGetter } from '@/types/reactivity'

  const props = defineProps<{
    filter?: MaybeGetter<FlowRunsFilter>,
  }>()

  const tabStates: Record<string, StateType[]> = {
    failed: ['failed', 'crashed'],
    running: ['running', 'pending', 'cancelling'],
    completed: ['completed'],
    scheduled: ['scheduled', 'paused'],
    cancelled: ['cancelled'],
  }

  const { count: cancelledCount } = useFlowRunsCount(getStateTypeFilterGetter('cancelled'))

  const tabs = computed(() => {
    const tabNames = Object.keys(tabStates)

    if (!cancelledCount.value || cancelledCount.value < 1) {
      tabNames.filter(value => value !== 'cancelled')
    }

    return tabNames
  })

  const selected = useRouteQueryParam('flow-run-state', 'failed')

  function getTabStates(tab: string): StateType[] {
    return tabStates[tab]
  }

  function getStateTypeFilterGetter(tab: string): Getter<FlowRunsFilter> {
    return () => {
      const base = toValue(props.filter)
      const filter: FlowRunsFilter = {
        flowRuns: {
          state: {
            type: getTabStates(tab),
          },
        },
        sort: 'EXPECTED_START_TIME_DESC',
      }

      return merge({}, base, filter)
    }
  }
</script>

<style>
.flow-run-state-type-tabs .p-tab { @apply
  flex-grow
  flex
  items-center
  justify-center
}
</style>