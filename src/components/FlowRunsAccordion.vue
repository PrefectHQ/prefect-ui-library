<template>
  <template v-if="flowIds">
    <p-accordion v-model:selected="selectedAccordionItem" :sections="flowIds" class="flow-runs-accordion">
      <template #header="{ section: flowId, id, toggle, content, selected }">
        <FlowRunsAccordionHeader :flow="getFlow(flowId)" v-bind="{ id, content, toggle, filter, selected }" />
      </template>
      <template #content="{ section: flowId }">
        <FlowRunsAccordionContent :flow-id="flowId" :filter="filter" />
      </template>
    </p-accordion>
  </template>
</template>

<script lang="ts" setup>
  import { Ref, computed, ref, watch } from 'vue'
  import FlowRunsAccordionContent from '@/components/FlowRunsAccordionContent.vue'
  import FlowRunsAccordionHeader from '@/components/FlowRunsAccordionHeader.vue'
  import { useFlows } from '@/compositions/useFlows'
  import { useInterval } from '@/compositions/useInterval'
  import { FlowRunsFilter, FlowsFilter } from '@/models/Filters'
  import { Flow } from '@/models/Flow'
  import { toMap } from '@/utilities'

  const props = defineProps<{
    filter: FlowRunsFilter,
  }>()

  const flowsFilter = computed<FlowsFilter>(() => {
    // eslint-disable-next-line no-unused-vars
    const { sort, limit, offset, ...filter } = props.filter

    return {
      ...filter,
      sort: 'UPDATED_DESC',
    }
  })

  const options = useInterval()
  const { flows } = useFlows(flowsFilter, options)
  const flowIds = computed(() => flows.value?.map(flow => flow.id))
  const flowsLookup = computed(() => toMap(flows.value ?? [], 'id'))

  const selectedAccordionItem: Ref<string | null> = ref(null)

  watch(flowIds, () => {
    selectedAccordionItem.value = flowIds.value?.[0] ?? null
  })

  function getFlow(id: string): Flow {
    const flow = flowsLookup.value.get(id)

    if (!flow) {
      throw new Error(`FlowRunsAccordion: Flow with id ${id} not found in flowsLookup`)
    }

    return flow
  }
</script>