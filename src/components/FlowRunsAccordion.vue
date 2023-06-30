<template>
  <template v-if="flowIds">
    <p-accordion v-model:selected="accordionModel" :sections="flowIds" class="flow-runs-accordion">
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

  const selectedAccordionItem: Ref<string | null> = ref(null)

  watch(flowIds, () => {
    selectedAccordionItem.value = flowIds.value?.[0] ?? null
  })

  const accordionModel = computed({
    get() {
      if (selectedAccordionItem.value) {
        return selectedAccordionItem.value
      }

      return null
    },
    set(selected) {
      selectedAccordionItem.value = selected
    },
  })

  function getFlow(id: string): Flow {
    const flow = flowsLookup.value.get(id)

    if (!flow) {
      throw new Error(`FlowRunsAccordion: Flow with id ${id} not found in flowsLookup`)
    }

    return flow
  }
</script>