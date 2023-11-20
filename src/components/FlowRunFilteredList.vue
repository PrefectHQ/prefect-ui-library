<template>
  <div class="flow-run-filtered-list">
    <div ref="stickyControls" class="flow-run-filtered-list__controls" :class="classes.header">
      <div class="flow-run-filtered-list__controls--right">
        <ResultsCount v-if="selected.length == 0" :count="total" label="Flow run" />
        <SelectedCount v-else :count="selected.length" />

        <FlowRunsDeleteButton v-if="can.delete.flow_run" :selected="selected" @delete="deleteFlowRuns" />
      </div>

      <StateNameSelect v-model:selected="filter.flowRuns.state.name" multiple empty-message="All run states" class="flow-run-filtered-list__state-select" />
      <FlowRunsSort v-model="filter.sort" class="flow-run-filtered-list__flow-runs-sort" />
    </div>

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
  </div>
</template>

<script lang="ts" setup>
  import { usePositionStickyObserver } from '@prefecthq/vue-compositions'
  import merge from 'lodash.merge'
  import { computed, ref } from 'vue'
  import { ResultsCount, StateNameSelect, FlowRunsSort, FlowRunList, SelectedCount, FlowRunsDeleteButton } from '@/components'
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

  const { filter, clear, isCustomFilter } = useFlowRunsFilterFromRoute(merge({}, props.filter), props.prefix)

  const { flowRuns, total, subscriptions, next } = useFlowRuns(filter, {
    interval: 30000,
    mode: 'infinite',
  })

  const empty = computed(() => subscriptions.executed && flowRuns.value.length === 0)

  const stickyControls = ref<HTMLElement>()
  const { stuck } = usePositionStickyObserver(stickyControls)

  const classes = computed(() => ({
    header: {
      'flow-run-filtered-list__controls--stuck': stuck.value,
    },
  }))

  const deleteFlowRuns = (): void => {
    selected.value = []
    subscriptions.refresh()
  }
</script>

<style>
.flow-run-filtered-list { @apply
  grid
  gap-2
}

.flow-run-filtered-list__controls { @apply
  flex
  gap-2
  items-center
  flex-col
  sm:flex-row
  sticky
  rounded-b-default
  top-0
  p-2
  z-10
}

.flow-run-filtered-list__controls--stuck { @apply
  bg-floating-sticky
  backdrop-blur-sm
  shadow-md
}

.flow-run-filtered-list__controls--right { @apply
  mr-auto
  flex
  gap-2
  items-center
}

.flow-run-filtered-list__state-select { @apply
  w-full
  sm:w-52
}

.flow-run-filtered-list__flow-runs-sort { @apply
  w-full
  sm:w-fit
}
</style>