<template>
  <ComponentPage title="FlowRunDetails">
    <FlowDetails :flow="flow" />
  </ComponentPage>
</template>

<script lang="ts" setup>
  import FlowDetails from '@/components/FlowDetails.vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'
  import { useFlowMock } from '@/demo/compositions/useFlowMock'

  const flow = useFlowMock()
</script>
