<template>
  <ComponentPage title="BlockTypeSnippet">
    <BlockTypeSnippet :snippet="snippet" :name="name" />
  </ComponentPage>
</template>

<script lang="ts" setup>
  import BlockTypeSnippet from '@/components/BlockTypeSnippet.vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'
  import { mocker } from '@/services'

  const snippet = mocker.create('blockTypeSnippet')
  const name = mocker.create('noun')
</script>