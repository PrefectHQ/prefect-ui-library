<template>
  <ComponentPage title="FlowList">
    <p-content>
      <FlowList selectable />
    </p-content>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import { FlowList } from '@/components'
  import ComponentPage from '@/demo/components/ComponentPage.vue'
  import { useFlowsMock } from '@/demo/compositions/useFlowMock'

  useFlowsMock(2)
</script>
