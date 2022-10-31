<template>
  <ComponentPage
    title="FlowRunList"
    :demos="[{ title: 'Basic' }]"
  >
    <template #description>
      This is where we add a short description of <p-code>FlowRunList</p-code>. Describe the components intent, not hyper specific documentation that belongs on vitepress page.
    </template>

    <template #basic>
      <FlowRunList :flow-runs="flowRuns" :selected="[]" class="color-mode-default" />
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import FlowRunList from '@/components/FlowRunList.vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'
  import { useFlowRunsMock } from '@/demo/compositions/useFlowRunsMock'

  const flowRuns = useFlowRunsMock(5)
</script>
