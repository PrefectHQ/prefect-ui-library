<template>
  <div class="flow-run-state-type-count">
    <span class="flow-run-state-type-count__badge" :class="badgeColorClass" />
    {{ count }}
  </div>
</template>

<script lang="ts" setup>
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import { useWorkspaceApi } from '@/compositions/useWorkspaceApi'
  import { FlowRunsFilter } from '@/models/Filters'
  import { StateType } from '@/models/StateType'

  const props = defineProps<{
    stateType: StateType,
    filter?: FlowRunsFilter,
  }>()

  const api = useWorkspaceApi()
  const filter = computed(() => ({
    ...props.filter,
    flowRuns: {
      ...props.filter?.flowRuns,
      state: {
        type: [props.stateType],
      },
    },
  }))
  const subscription = useSubscription(api.flowRuns.getFlowRunsCount, [filter])
  const count = computed(() => subscription.response)
  const badgeColorClass = computed(() => `bg-state-${props.stateType}-500`)
</script>

<style>
.flow-run-state-type-count { @apply
  flex
  flex-col
  gap-2
  items-center
}

.flow-run-state-type-count__badge { @apply
  h-1
  w-3
}
</style>