<template>
  <ComponentPage title="FlowListItem">
    <FlowListItem :flow="flow" />
  </ComponentPage>
</template>

<script lang="ts" setup>
  import { FlowListItem } from '@/components'
  import ComponentPage from '@/demo/components/ComponentPage.vue'
  import { useFlowMock } from '@/demo/compositions/useFlowMock'

  const flow = useFlowMock()
</script>
