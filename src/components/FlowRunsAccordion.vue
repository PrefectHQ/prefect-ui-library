<template>
  <template v-if="flowIds">
    <p-accordion :sections="flowIds" class="flow-runs-accordion">
      <template #header="{ section: flowId, id, toggle, content, selected }">
        <FlowRunsAccordionHeader :flow="getFlow(flowId)!" v-bind="{ id, content, toggle, filter, selected }" />
      </template>
      <template #content="{ section: flowId }">
        <FlowRunsAccordionContent :flow-id="flowId" :filter="filter" />
      </template>
    </p-accordion>
  </template>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import FlowRunsAccordionContent from '@/components/FlowRunsAccordionContent.vue'
  import FlowRunsAccordionHeader from '@/components/FlowRunsAccordionHeader.vue'
  import { useFlows } from '@/compositions/useFlows'
  import { FlowRunsFilter, FlowsFilter } from '@/models/Filters'
  import { Flow } from '@/models/Flow'
  import { toMap } from '@/utilities'

  const props = defineProps<{
    filter: FlowRunsFilter,
  }>()

  const flowsFilter = computed<FlowsFilter>(() => {
    // eslint-disable-next-line no-unused-vars
    const { sort, limit, offset, ...filter } = props.filter

    return filter
  })

  const { flows } = useFlows(flowsFilter)
  const flowIds = computed(() => flows.value?.map(flow => flow.id))
  const flowsLookup = computed(() => toMap(flows.value ?? [], 'id'))

  function getFlow(id: string): Flow | undefined {
    return flowsLookup.value.get(id)
  }
</script>