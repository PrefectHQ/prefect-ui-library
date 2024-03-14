<template>
  <p-content class="flow-run-filtered-list">
    <p-list-header sticky>
      <template v-if="selectable">
        <p-checkbox v-model="selectAllModel" :indeterminate="selected.length && selected.length < flowRuns.length">
          Select All
        </p-checkbox>
      </template>

      <ResultsCount v-if="selected.length == 0" :count="total" label="Flow run" />
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

    <FlowRunList v-model:selected="selected" :flow-runs="flowRuns" :selectable="selectable && can.delete.flow_run" @bottom="next" />

    <PEmptyResults v-if="empty">
      <template #message>
        <slot name="empty-message">
          No runs found
        </slot>
      </template>
      <template v-if="isCustomFilter" #actions>
        <p-button small @click="clear">
          Clear Filters
        </p-button>
      </template>
    </PEmptyResults>
  </p-content>
</template>

<script lang="ts" setup>
  import { useDebouncedRef } from '@prefecthq/vue-compositions'
  import merge from 'lodash.merge'
  import { computed, ref } from 'vue'
  import {
    ResultsCount,
    StateNameSelect,
    FlowRunsSort,
    FlowRunList,
    SelectedCount,
    FlowRunsDeleteButton
  } from '@/components'
  import SearchInput from '@/components/SearchInput.vue'
  import { useFlowRuns, useFlowRunsFilterFromRoute } from '@/compositions'
  import { useCan } from '@/compositions/useCan'
  import { FlowRunsFilter } from '@/models/Filters'

  const props = defineProps<{
    filter?: FlowRunsFilter,
    selectable?: boolean,
    prefix?: string,
  }>()

  const can = useCan()
  const selected = ref<string[]>([])
  const searchTerm = ref('')
  const searchTermDebounced = useDebouncedRef(searchTerm, 500)

  const { filter, clear, isCustomFilter } = useFlowRunsFilterFromRoute(merge({}, props.filter, {
    flowRuns: {
      nameLike: searchTermDebounced,
    },
  }), props.prefix)

  const { flowRuns, total, subscriptions, next } = useFlowRuns(filter, {
    interval: 30000,
    mode: 'infinite',
  })

  const selectAllModel = computed({
    get: () => selected.value.length > 0,
    set: (value: boolean) => {
      if (value) {
        selected.value = flowRuns.value.map((flowRun) => flowRun.id)
      } else {
        selected.value = []
      }
    },
  })

  const empty = computed(() => subscriptions.executed && flowRuns.value.length === 0)

  const deleteFlowRuns = (): void => {
    selected.value = []
    subscriptions.refresh()
  }
</script>

<style>
.flow-run-filtered-list__search { @apply
  min-w-[224px]
}
</style>