<template>
  <div class="flow-runs-controls_list">
    <div class="flow-runs-controls_list__controls">
      <ResultsCount :count="flowRuns.length" class="mr-auto" label="Flow run" />
      <StateSelect v-model:selected="states" empty-message="All run states" class="flow-runs-controls_list__state-select" />
      <FlowRunsSort v-model="sort" class="flow-runs-controls_list__flow-runs-sort" />
    </div>
    <FlowRunList v-if="flowRuns.length" :flow-runs="flowRuns" disabled :selected="[]" />
    <PEmptyResults v-else>
      <template #message>
        No runs from the last 7 days
      </template>
    </PEmptyResults>
  </div>
</template>

<script lang="ts" setup>
  import { useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import { ResultsCount, StateSelect, FlowRunsSort, FlowRunList } from '@/components'
  import { useFlowRunFilterFromRoute } from '@/compositions'
  import { flowRunsApiKey } from '@/services'
  import { UnionFilters } from '@/types'
  import { inject } from '@/utilities'


  const flowRunsApi = inject(flowRunsApiKey)

  const props = defineProps<{
    flowRunFilter: UnionFilters,
  }>()

  const { states, sort } = useFlowRunFilterFromRoute()

  const flowRunsFilterArgs = computed<[filter: UnionFilters] | null>(() => props.flowRunFilter.sort || props.flowRunFilter.flow_runs ? [props.flowRunFilter] : null)

  const flowRunsSubscription = useSubscriptionWithDependencies(flowRunsApi.getFlowRuns, flowRunsFilterArgs)
  const flowRuns = computed(() => flowRunsSubscription.response ?? [])
</script>

<style>
.flow-runs-controls_list { @apply
  grid
  gap-2
}

.flow-runs-controls_list__controls { @apply
  flex
  gap-2
  items-center
  flex-col
  sm:flex-row
}

.flow-runs-controls_list__state-select { @apply
  w-full
  sm:w-52
}

.flow-runs-controls_list__flow-runs-sort { @apply
  w-full
  sm:w-fit
}
</style>