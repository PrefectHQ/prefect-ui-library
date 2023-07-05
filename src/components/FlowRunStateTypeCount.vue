<template>
  <div class="flow-run-state-type-count">
    <span class="flow-run-state-type-count__badge">
      <template v-for="state in states" :key="state">
        <span class="flow-run-state-type-count__state" :class="getStateTypeClass(state)" />
      </template>
    </span>
    <span class="flow-run-state-type-count__value">{{ count }}</span>
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { useFlowRunsCount } from '@/compositions/useFlowRunsCount'
  import { useInterval } from '@/compositions/useInterval'
  import { FlowRunsFilter } from '@/models/Filters'
  import { StateType } from '@/models/StateType'
  import { MaybeArray } from '@/types/utilities'
  import { asArray } from '@/utilities/arrays'

  const props = defineProps<{
    stateType: MaybeArray<StateType>,
    filter?: FlowRunsFilter,
  }>()

  const filter = computed(() => ({
    ...props.filter,
    flowRuns: {
      ...props.filter?.flowRuns,
      state: {
        type: states.value,
      },
    },
  }))

  const states = computed(() => asArray(props.stateType))

  const options = useInterval()
  const { count } = useFlowRunsCount(filter, options)

  function getStateTypeClass(state: StateType): string {
    return `bg-state-${state}-500`
  }
</script>

<style>
.flow-run-state-type-count { @apply
  flex
  flex-col
  gap-1
  items-center
}

.flow-run-state-type-count__badge { @apply
  h-1
  w-4
  rounded-full
  grid
  auto-cols-fr
  grid-flow-col
  overflow-hidden
}

.flow-run-state-type-count__value { @apply
  text-lg
  font-bold
}
</style>