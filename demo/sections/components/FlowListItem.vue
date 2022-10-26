<template>
  <ComponentPage
    title="Flow List Item"
    :demos="[{ title: 'Basic' }]"
  >
    <template #description>
      This is where we add a short description of <p-code>FlowListItem</p-code>. Describe the components intent, not hyper specific documentation that belongs on vitepress page.
    </template>

    <template #basic>
      <FlowRunListItem :flow-run="flowRun" :selected="[]" />
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import FlowRunListItem from '@/components/FlowRunListItem.vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'
  import { mocker } from '@/services'

  const flowRun = mocker.create('flowRun')
</script>
