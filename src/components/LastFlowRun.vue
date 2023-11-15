<template>
  <FlowRunName :flow-run="flowRun" />
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