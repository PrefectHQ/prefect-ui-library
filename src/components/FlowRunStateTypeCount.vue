<template>
  <div class="flow-run-state-type-count">
    <span class="flow-run-state-type-count__badge" :class="badgeColorClass" />
    <span class="flow-run-state-type-count__value">{{ count }}</span>
  </div>
</template>

<script lang="ts" setup>
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import { useWorkspaceApi } from '@/compositions/useWorkspaceApi'
  import { FlowRunsFilter } from '@/models/Filters'
  import { StateType } from '@/models/StateType'
  import { MaybeArray } from '@/types/utilities'
  import { asArray } from '@/utilities/arrays'

  const props = defineProps<{
    stateType: MaybeArray<StateType>,
    filter?: FlowRunsFilter,
  }>()

  const api = useWorkspaceApi()
  const filter = computed(() => ({
    ...props.filter,
    flowRuns: {
      ...props.filter?.flowRuns,
      state: {
        type: asArray(props.stateType),
      },
    },
  }))
  const subscription = useSubscription(api.flowRuns.getFlowRunsCount, [filter])
  const count = computed(() => subscription.response)
  const badgeColorClass = computed(() => {
    const [state] = asArray(props.stateType)

    return `bg-state-${state}-500`
  })
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
  w-3
  rounded-full
}

.flow-run-state-type-count__value { @apply
  text-lg
  font-bold
}
</style>