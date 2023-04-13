<template>
  <ComponentPage title="FlowListItem">
    <FlowListItem :flow="flowNoDeployments" />
  </ComponentPage>
</template>

<script lang="ts" setup>
  import { FlowListItem } from '@/components'
  import ComponentPage from '@/demo/components/ComponentPage.vue'
  import { useFlowMock } from '@/demo/compositions/useFlowMock'

  const flowNoDeployments = useFlowMock({}, { deploymentsCount: 0 })
</script>
