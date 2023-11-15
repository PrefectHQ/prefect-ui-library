<template>
  <FlowRunName :flow-run="flowRun" />
</template>

<script lang="ts" setup>
  import { FlowRunName } from '@/components'
  import { useNextFlowRun } from '@/compositions'

  const props = defineProps<{
    flowId: string,
  }>()

  const { flowRun } = useNextFlowRun(() => ({
    flows: {
      id: [props.flowId],
    },
  }))
</script>