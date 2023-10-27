<template>
  <template v-if="flowIds">
    <p-accordion v-model:selected="selectedAccordionItem" :sections="flowIds" class="flow-runs-accordion">
      <template #header="{ section: flowId, id, toggle, content, selected }">
        <FlowRunsAccordionHeader :flow="getFlow(flowId)" :filter="flowRunsFilter" v-bind="{ id, content, toggle, selected }" />
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
  import { Ref, computed, ref, toRef, watch } from 'vue'
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

  const selectedAccordionItem: Ref<string | null> = ref(null)

  watch(flowIds, () => {
    selectedAccordionItem.value = flowIds.value[0] ?? null
  })

  function getFlow(id: string): Flow {
    const flow = flowsLookup.value.get(id)

    if (!flow) {
      throw new Error(`FlowRunsAccordion: Flow with id ${id} not found in flowsLookup`)
    }

    return flow
  }
</script>

<style>
.p-accordion__section:first-child .flow-runs-accordion-header:first-of-type { @apply
  border-0
}
</style>