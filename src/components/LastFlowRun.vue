<template>
  <FlowRunName :flow-run="flowRun" />
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { FlowRunName } from '@/components'
  import { useLastFlowRun } from '@/compositions'
  import { UnionFilter } from '@/models'

  const props = defineProps<{
    flowId?: string,
  }>()

  const filter = computed(() => ({
    flows: {
      id: [props.flowId],
    },
  })) as UnionFilter

  const { flowRun } = useLastFlowRun(filter)
</script>