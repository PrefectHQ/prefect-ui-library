<template>
  <template v-if="flowIds">
    <p-accordion :sections="flowIds" class="flow-runs-accordion">
      <template #heading="{ section: flowId }">
        <FlowRunsAccordionHeader :flow="getFlow(flowId)" :filter="flowRunsFilter" />
      </template>
      <template #content="{ section: flowId }">
        <FlowRunsAccordionContent :flow-id="flowId" :filter="flowRunsFilter" />
      </template>
    </p-accordion>
  </template>
  <template v-if="!count && loaded">
    <FlowRunStateTypeEmpty :state-type="stateType" />
  </template>
</template>

<script lang="ts" setup>
  import { computed, toRef } from 'vue'
  import FlowRunsAccordionContent from '@/components/FlowRunsAccordionContent.vue'
  import FlowRunsAccordionHeader from '@/components/FlowRunsAccordionHeader.vue'
  import FlowRunStateTypeEmpty from '@/components/FlowRunStateTypeEmpty.vue'
  import { useFlowRunsCount } from '@/compositions/useFlowRunsCount'
  import { useFlows } from '@/compositions/useFlows'
  import { useInterval } from '@/compositions/useInterval'
  import { FlowRunsFilter, FlowsFilter } from '@/models/Filters'
  import { Flow } from '@/models/Flow'
  import { StateType } from '@/models/StateType'
  import { Getter, MaybeGetter } from '@/types/reactivity'
  import { MaybeArray } from '@/types/utilities'
  import { toMap } from '@/utilities'

  const props = defineProps<{
    filter: MaybeGetter<FlowRunsFilter>,
    stateType: MaybeArray<StateType>,
  }>()

  const flowRunsFilter = toRef(props.filter)
  const flowsFilter: Getter<FlowsFilter> = () => {
    // eslint-disable-next-line no-unused-vars
    const { sort, limit, offset, ...filter } = flowRunsFilter.value

    return {
      ...filter,
      sort: 'UPDATED_DESC',
    }
  }
  const options = useInterval()
  const { count, subscription } = useFlowRunsCount(flowRunsFilter, options)
  const loaded = computed(() => subscription.executed)
  const { flows } = useFlows(flowsFilter, options)
  const flowIds = computed(() => flows.value.map(flow => flow.id))
  const flowsLookup = computed(() => toMap(flows.value, 'id'))

  function getFlow(id: string): Flow {
    const flow = flowsLookup.value.get(id)

    if (!flow) {
      throw new Error(`FlowRunsAccordion: Flow with id ${id} not found in flowsLookup`)
    }

    return flow
  }
</script>

<style>
.flow-runs-accordion *:last-child {@apply
  border-b-0
}
</style>