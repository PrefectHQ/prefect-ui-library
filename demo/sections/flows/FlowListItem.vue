<template>
  <ComponentPage title="FlowListItem">
    <FlowListItem :flow="flowNoDeployments" />

    <template v-for="flow in flows" :key="flow.id">
      <FlowListItem :flow="flow" />
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import { FlowListItem } from '@/components'
  import ComponentPage from '@/demo/components/ComponentPage.vue'
  import { useFlowsMock, useFlowMock } from '@/demo/compositions/useFlowMock'

  const flowNoDeployments = useFlowMock({}, { deploymentsCount: 0 })

  const flows = useFlowsMock(4)
</script>
