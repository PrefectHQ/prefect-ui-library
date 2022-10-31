<template>
  <ComponentPage
    title="FlowRunListItem"
    :demos="[{ title: 'Basic' }]"
  >
    <template #description>
      This is where we add a short description of <p-code>FlowRunListItem</p-code>. Describe the components intent, not hyper specific documentation that belongs on vitepress page.
    </template>

    <template #basic>
      <FlowRunListItem :flow-run="flowRun" :selected="[]" class="color-mode-default" />
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import FlowRunListItem from '@/components/FlowRunListItem.vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'
  import { useFlowRunMock } from '@/demo/compositions/useFlowRunsMock'

  const flowRun = useFlowRunMock()
</script>
