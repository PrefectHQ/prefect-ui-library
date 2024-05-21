<template>
  <FlowRunName v-if="flowRun" :flow-run-id="flowRun.id" :flow-run-name="flowRun.name" :state-type="flowRun.stateType" :state-name="flowRun?.stateName" />
</template>

<script lang="ts" setup>
  import { FlowRunName } from '@/components'
  import { useLastFlowRun } from '@/compositions'

  const props = defineProps<{
    flowId: string,
  }>()

  const { flowRun } = useLastFlowRun(() => ({
    flows: {
      id: [props.flowId],
    },
  }))
</script>