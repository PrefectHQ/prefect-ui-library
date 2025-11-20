<template>
  <p-content class="flow-run-filtered-list">
    <p-list-header sticky>
      <template v-if="selectable">
        <p-select-all-checkbox v-model="selected" :selectable="flowRuns.map((flowRun) => flowRun.id)" item-name="flow run" />
      </template>

      <ResultsCount v-if="selected.length == 0" :count label="Flow run" />
      <SelectedCount v-else :count="selected.length" />
      <FlowRunsDeleteButton v-if="can.delete.flow_run" :selected="selected" @delete="deleteFlowRuns" />

      <template #controls>
        <SearchInput v-model="searchTerm" placeholder="Search by run name" label="Search by run name" class="flow-run-filtered-list__search" />
        <StateNameSelect v-model:selected="filter.flowRuns.state.name" multiple empty-message="All run states" />
      </template>

      <template #sort>
        <FlowRunsSort v-model="filter.sort" />
      </template>
    </p-list-header>

    <p-empty-results v-if="empty">
      <template #message>
        <template v-if="errored">
          <slot name="error-message" v-bind="{ error }">
            {{ localization.error.readFlowRuns }}
          </slot>
        </template>
        <template v-else>
          <slot name="empty-message">
            No runs found
          </slot>
        </template>
      </template>

      <template v-if="isCustomFilter" #actions>
        <p-button size="sm" @click="clear">
          Clear Filters
        </p-button>
      </template>
    </p-empty-results>


    <template v-else>
      <FlowRunList v-model:selected="selected" :hide-details :hide-flow-name :flow-runs :selectable="selectable && can.delete.flow_run" />

      <p-pager v-model:limit="filter.limit" v-model:page="filter.page" :pages="pages" />
    </template>
  </p-content>
</template>

<script lang="ts" setup>
  import { useDebouncedRef, useLocalStorage } from '@prefecthq/vue-compositions'
  import merge from 'lodash.merge'
  import { computed, ref, watch } from 'vue'
  import {
    ResultsCount,
    StateNameSelect,
    FlowRunsSort,
    FlowRunList,
    SelectedCount,
    FlowRunsDeleteButton
  } from '@/components'
  import SearchInput from '@/components/SearchInput.vue'
  import { useFlowRunsPaginationFilterFromRoute, usePaginatedFlowRuns } from '@/compositions'
  import { useCan } from '@/compositions/useCan'
  import { localization } from '@/localization'
  import { FlowRunsFilter } from '@/models/Filters'

  const props = defineProps<{
    filter?: FlowRunsFilter,
    selectable?: boolean,
    prefix?: string,
    hideDetails?: boolean,
    hideFlowName?: boolean,
  }>()

  const can = useCan()
  const selected = ref<string[]>([])
  const searchTerm = ref('')
  const searchTermDebounced = useDebouncedRef(searchTerm, 500)
  const { value: limit } = useLocalStorage('flow-run-list-limit', 10)

  const { filter, clear, isCustomFilter } = useFlowRunsPaginationFilterFromRoute(merge({}, props.filter, {
    flowRuns: {
      nameLike: searchTermDebounced,
    },
    limit,
  }), props.prefix)

  // Reset pagination to page 1 whenever the flow run state filter changes.
  // This prevents showing an empty or incorrect page when the result set changes.
  watch(
    () => filter.flowRuns?.state?.name,
    (newState, oldState) => {
    // Use JSON.stringify for deep comparison since the value may be an array.
      if (JSON.stringify(newState) !== JSON.stringify(oldState)) {
        filter.page = 1
      }
    },
  { deep: true }
  )

  const { flowRuns, count, pages, subscription, errored, error } = usePaginatedFlowRuns(filter, {
    interval: 30000,
  })

  const empty = computed(() => subscription.executed && flowRuns.value.length === 0)

  const deleteFlowRuns = (): void => {
    selected.value = []
    subscription.refresh()
  }
</script>

<style>
.flow-run-filtered-list__search { @apply
  min-w-[224px]
}
</style>