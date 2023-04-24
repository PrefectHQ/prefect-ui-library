<template>
  <div v-if="parentFlowRunId" class="flow-run-parent-flow-run">
    <span>{{ localization.info.parentFlowRun }}</span> <FlowRunIconText :flow-run-id="parentFlowRunId" />
  </div>
</template>

<script lang="ts" setup>
  import { useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import FlowRunIconText from '@/components/FlowRunIconText.vue'
  import { useWorkspaceApi } from '@/compositions'
  import { localization } from '@/localization'

  const props = defineProps<{
    parentTaskRunId: string,
  }>()

  const api = useWorkspaceApi()

  const flowRunFilter = computed<Parameters<typeof api.flowRuns.getFlowRuns> | null>(() => {
    return [
      {
        taskRuns: {
          id: [props.parentTaskRunId],
        },
      },
    ]
  })

  const parentFlowRunListSubscription = useSubscriptionWithDependencies(api.flowRuns.getFlowRuns, flowRunFilter)
  const parentFlowRunList = computed(() => parentFlowRunListSubscription.response ?? [])
  const parentFlowRunId = computed(() => {
    if (!parentFlowRunList.value.length) {
      return
    }
    const [value] = parentFlowRunList.value
    return value.id
  })
</script>

<style>
.flow-run-parent-flow-run { @apply
  flex gap-1
}
</style>