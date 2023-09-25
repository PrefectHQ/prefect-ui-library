<template>
  <div class="flow-run-sub-flows">
    <div class="flow-run-sub-flows__filters">
      <ResultsCount :count="total" label="Subflow run" class="flow-run-sub-flows__count" />
      <SearchInput v-model="searchTerm" placeholder="Search by run name" label="Search by run name" class="flow-run-sub-flows__search" />
      <StateNameSelect v-model:selected="states" empty-message="All states" class="flow-run-sub-flows__state" />
      <FlowRunsSort v-model="sort" class="flow-run-sub-flows__sort" />
    </div>

    <template v-if="!empty">
      <FlowRunList :flow-runs="flowRuns" @bottom="next" />
    </template>

    <PEmptyResults v-if="empty">
      <template #message>
        No subflow runs
      </template>
      <template v-if="hasFilters" #actions>
        <p-button small @click="clear">
          Clear Filters
        </p-button>
      </template>
    </PEmptyResults>
  </div>
</template>

<script lang="ts" setup>
  import { PEmptyResults } from '@prefecthq/prefect-design'
  import { useDebouncedRef } from '@prefecthq/vue-compositions'
  import { computed, ref } from 'vue'
  import FlowRunList from '@/components/FlowRunList.vue'
  import FlowRunsSort from '@/components/FlowRunsSort.vue'
  import ResultsCount from '@/components/ResultsCount.vue'
  import SearchInput from '@/components/SearchInput.vue'
  import StateNameSelect from '@/components/StateNameSelect.vue'
  import { useFlowRuns } from '@/compositions'
  import { FlowRunsFilter } from '@/models/Filters'
  import { FlowRunSortValues } from '@/types/SortOptionTypes'

  const props = defineProps<{
    flowRunId: string,
  }>()

  const states = ref<string[]>([])
  const searchTerm = ref('')
  const searchTermDebounced = useDebouncedRef(searchTerm, 1200)
  const sort = ref<FlowRunSortValues>('START_TIME_DESC')
  const hasFilters = computed(() => states.value.length || searchTerm.value.length)

  const subFlowRunsFilter = (): FlowRunsFilter => ({
    flowRuns: {
      nameLike: searchTermDebounced.value,
      parentFlowRunId: [props.flowRunId],
    },
    sort: sort.value,
  })

  const { flowRuns, total, subscriptions, next } = useFlowRuns(subFlowRunsFilter)
  const empty = computed(() => !subscriptions.loading && flowRuns.value.length === 0)

  function clear(): void {
    states.value = []
    searchTerm.value = ''
  }

  // always load the first page
  next()
</script>


<style>
.flow-run-sub-flows__filters { @apply
  grid
  items-center
  gap-2
  mb-4;
  grid-template-areas: "search search"
                        "state state"
                        "count sort";
  grid-template-columns: 1fr min-content
}

@screen md {
  .flow-run-sub-flows__filters {
    grid-template-areas: "count search state sort";
    grid-template-columns: 1fr max-content min-content min-content;
  }
}

.flow-run-sub-flows__count {
  grid-area: count;
}

.flow-run-sub-flows__search {
  grid-area: search;
}

.flow-run-sub-flows__sort {
  grid-area: sort;
}

.flow-run-sub-flows__state {
  grid-area: state;
}
</style>