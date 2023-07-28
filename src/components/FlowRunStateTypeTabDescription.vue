<template>
  <template v-if="hasCount">
    <span v-if="description" class="flow-run-state-type-tab-description">
      {{ description }}
    </span>
    <div v-else>
      <FlowRunStateTypeEmpty :state-type="stateType" />
    </div>
  </template>
</template>

<script lang="ts" setup>
  import merge from 'lodash.merge'
  import { computed, toValue } from 'vue'
  import FlowRunStateTypeEmpty from '@/components/FlowRunStateTypeEmpty.vue'
  import { useFlowRunsCount } from '@/compositions/useFlowRunsCount'
  import { useInterval } from '@/compositions/useInterval'
  import { FlowRunsFilter } from '@/models/Filters'
  import { StateType } from '@/models/StateType'
  import { Getter, MaybeGetter } from '@/types/reactivity'
  import { MaybeArray } from '@/types/utilities'
  import { asArray } from '@/utilities/arrays'

  const props = defineProps<{
    stateType: MaybeArray<StateType>,
    filter?: MaybeGetter<FlowRunsFilter>,
  }>()

  const states = computed(() => asArray(props.stateType))
  const filter: Getter<FlowRunsFilter> = () => {
    const base = toValue(props.filter)
    const withTypes: FlowRunsFilter = {
      flowRuns: {
        state: {
          type: states.value,
        },
      },
    }

    return merge({}, base, withTypes)
  }

  const options = useInterval()
  const { count } = useFlowRunsCount(filter, options)
  const hasCount = computed(() => count.value !== undefined)

  const formatter = new Intl.ListFormat('en', { style: 'long', type: 'disjunction' })
  const description = computed(() => {
    const statesString = formatter.format(states.value)

    if (count.value) {
      return `Flows with ${statesString} runs`
    }

    return null
  })
</script>

<style>
.flow-run-state-type-tab-description { @apply
  text-foreground-200
}
</style>