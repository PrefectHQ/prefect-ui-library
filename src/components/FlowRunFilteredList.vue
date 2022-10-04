<template>
  <div class="flow-run-filtered-list">
    <div class="flow-run-filtered-list__controls">
      <ResultsCount :count="flowRunCount" class="mr-auto" label="Flow run" />
      <StateSelect :selected="state" empty-message="All run states" class="flow-run-filtered-list__state-select" @update:selected="updateState" />
      <FlowRunsSort v-model="sort" class="flow-run-filtered-list__flow-runs-sort" />
      <Transition name="slide-fade">
        <p-button v-if="selectedFlowRuns.length > 0" danger icon="TrashIcon" @click="open" />
      </Transition>
    </div>
    <FlowRunList v-model:selected="selectedFlowRuns" :flow-runs="flowRuns" :disabled="disabled" @bottom="flowRunsSubscription.loadMore" />
    <PEmptyResults v-if="empty">
      <template #message>
        No runs from the last 7 days
      </template>
      <template v-if="hasFilters" #actions>
        <p-button size="sm" secondary @click="clear">
          Clear Filters
        </p-button>
      </template>
    </PEmptyResults>
  </div>
  <ConfirmDeleteModal
    v-model:showModal="showModal"
    name="selected flow runs"
    label="Flow Runs"
    @delete="deleteFlowRuns(selectedFlowRuns)"
  />
</template>

<script lang="ts" setup>
  import { showToast } from '@prefecthq/prefect-design'
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed, onMounted, ref } from 'vue'
  import { ResultsCount, StateSelect, FlowRunsSort, FlowRunList } from '@/components'
  import ConfirmDeleteModal from '@/components/ConfirmDeleteModal.vue'
  import { useShowModal } from '@/compositions'
  import { usePaginatedSubscription } from '@/compositions/usePaginatedSubscription'
  import { localization } from '@/localization'
  import { StateType } from '@/models'
  import { flowRunsApiKey, mapper } from '@/services'
  import { FlowRunSortValues, UnionFilters } from '@/types'
  import { inject } from '@/utilities'

  const flowRunsApi = inject(flowRunsApiKey)

  const props = defineProps<{
    flowRunFilter: UnionFilters,
    states?: StateType[],
    disabled?: boolean,
  }>()

  const emit = defineEmits<{
    (event: 'update:states', value: StateType[]): void,
    (event: 'delete'): void,
  }>()

  const selectedFlowRuns = ref<string[]>([])
  const state = ref<StateType[]>(props.states ?? [])
  const updateState = (newValue: string | string[] | null): void => {
    state.value = newValue as StateType[]
    emit('update:states', state.value)
  }

  const sort = ref<FlowRunSortValues>('EXPECTED_START_TIME_DESC')
  const hasFilters = computed(() => state.value.length)

  const filter = computed<UnionFilters>(() => {
    const runFilter: UnionFilters = {
      ...props.flowRunFilter,
      sort: sort.value,
    }

    const flowRunsFilter = {
      ...props.flowRunFilter.flow_runs,
    }

    if (state.value.length) {
      flowRunsFilter.state = {
        type: {
          any_: state.value.map(state => mapper.map('StateType', state, 'ServerStateType')),
        },
      }
    }

    return { ...runFilter, flow_runs: { ...flowRunsFilter } }
  })

  const flowRunCountSubscription = useSubscription(flowRunsApi.getFlowRunsCount, [filter], { interval: 30000 })
  const flowRunCount = computed(() => flowRunCountSubscription.response)

  const flowRunsSubscription = usePaginatedSubscription(flowRunsApi.getFlowRuns, [filter], { interval: 30000 })
  const flowRuns = computed(() => flowRunsSubscription.response ?? [])

  const empty = computed(() => flowRunsSubscription.executed && flowRuns.value.length === 0)

  function clear(): void {
    state.value = []
  }

  const { showModal, open, close } = useShowModal()
  const deleteFlowRuns = async (flowRuns: string[]): Promise<void> => {
    const toastMessage = computed(() => {
      if (flowRuns.length === 1) {
        return 'Flow run deleted'
      }
      return `${flowRuns.length} flow runs deleted`
    })
    try {
      close()
      const deleteFlowRuns = flowRuns.map(flowRunsApi.deleteFlowRun)
      await Promise.all(deleteFlowRuns)

      showToast(toastMessage, 'success')

      await Promise.all([flowRunCountSubscription.refresh(), flowRunsSubscription.refresh()])

      selectedFlowRuns.value = []
      clear()
    } catch (error) {
      showToast(localization.error.delete('Flow Run'), 'error')
    }
  }

  onMounted(() => {
    if (props.states) {
      state.value = props.states
    }
  })
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
}

.flow-run-filtered-list__state-select { @apply
  w-full
  sm:w-52
}

.flow-run-filtered-list__flow-runs-sort { @apply
  w-full
  sm:w-fit
}

.slide-fade-enter-active {
  transition: all 0.4s ease 0.1s;
}
.slide-fade-leave-active {
  transition: all 0.1s ease;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(25px);
  opacity: 0;
}
</style>