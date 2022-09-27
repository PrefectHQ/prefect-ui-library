<template>
  <div class="flow-runs-controls_list">
    <div class="flow-runs-controls_list__controls">
      <ResultsCount :count="flowRuns.length" class="mr-auto" label="Flow run" />
      <StateSelect v-model:selected="state" empty-message="All run states" class="flow-runs-controls_list__state-select" />
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
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed, ref } from 'vue'
  import { ResultsCount, StateSelect, FlowRunsSort, FlowRunList } from '@/components'
  import { StateType } from '@/models'
  import { flowRunsApiKey, mapper } from '@/services'
  import { FlowRunSortValues, UnionFilters } from '@/types'
  import { inject } from '@/utilities'

  const flowRunsApi = inject(flowRunsApiKey)

  const props = defineProps<{
    flowRunFilter: UnionFilters,
  }>()

  const state = ref<StateType[]>([])
  const sort = ref<FlowRunSortValues>('EXPECTED_START_TIME_DESC')


  const flowRunsFilter = computed<UnionFilters>(() => {
    const runFilter: UnionFilters = {
      ...props.flowRunFilter,
      sort: sort.value,
    }

    if (state.value.length) {
      runFilter.flow_runs!.state = {
        type: {
          any_: state.value.map(state => mapper.map('StateType', state, 'ServerStateType')),
        },
      }
    }

    return runFilter
  })

  const flowRunsSubscription = useSubscription(flowRunsApi.getFlowRuns, [flowRunsFilter], { interval: 30000 })
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