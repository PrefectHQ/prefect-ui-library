<template>
  <div v-if="parentFlowRunId" class="flow-run-parent-flow-run">
    <span>{{ localization.info.parentFlowRun }}</span> <FlowRunIconText :flow-run-id="parentFlowRunId" />
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import FlowRunIconText from '@/components/FlowRunIconText.vue'
  import { useFlowRuns } from '@/compositions'
  import { localization } from '@/localization'
  import { FlowRunsFilter } from '@/models/Filters'

  const props = defineProps<{
    parentTaskRunId: string,
  }>()

  const flowRunFilter = computed<FlowRunsFilter>(() => ({
    taskRuns: {
      id: [props.parentTaskRunId],
    },
  }))

  const { flowRuns } = useFlowRuns(flowRunFilter)

  const parentFlowRunId = computed(() => {
    if (!flowRuns.value.length) {
      return
    }
    const [value] = flowRuns.value
    return value.id
  })
</script>

<style>
.flow-run-parent-flow-run { @apply
  flex gap-1
}
</style>